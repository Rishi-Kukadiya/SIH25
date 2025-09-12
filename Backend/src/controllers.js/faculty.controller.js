import { asyncHandler } from "../utils/asyncHandler.js";
import { CourseOffering } from "../models/CourseOffering.model.js";
import { Attendance } from '../models/Attendance.model.js';
import { Grade } from '../models/Grade.model.js';
import { Enrollment } from '../models/Enrollment.model.js';
import { Student } from '../models/student.model.js';
import { User } from '../models/user.model.js';
import { Assessment } from '../models/Assessment.model.js';
import { Faculty } from "../models/faculty.model.js";
import { Course } from "../models/Course.model.js";

// -------------------- DASHBOARD --------------------
const dashboard = asyncHandler(async (req, res) => {
    try {
        const faculty = await Faculty.findOne({ user: req.user._id });
        if (!faculty) return res.json({ status: 404, message: "Faculty not found" });

        const facultyId = faculty._id;

        const courses = await CourseOffering.find({ faculty: facultyId })
            .populate('course', 'courseCode courseName credits')
            .lean();

        const courseIds = courses.map(c => c._id);

        // Count unique students across all offerings
        const studentIds = await Enrollment.distinct("student", { offering: { $in: courseIds } });
        const studentsCount = studentIds.length;

        const courseDetails = await Promise.all(courses.map(async (course) => {
            const enrollments = await Enrollment.find({ offering: course._id })
                .populate('student', 'user')
                .lean();

            // Attach student info with attendance & assessments
            const students = await Promise.all(enrollments.map(async (enrollment) => {
                const studentUser = await User.findById(enrollment.student.user)
                    .select('fullName email profilePic')
                    .lean();

                // Attendance for this student in this course
                const attendanceRecords = await Attendance.find({ enrollment: enrollment._id }).lean();
                const total = attendanceRecords.length;
                const presentCount = attendanceRecords.filter(a => a.status === "present").length;
                const attendancePct = total ? (presentCount / total) * 100 : 0;

                // Assessments for this student in this course
                const assessmentsInCourse = await Assessment.find({ offering: course._id }).lean();
                const assessmentsWithGrades = await Promise.all(assessmentsInCourse.map(async (assess) => {
                    const grade = await Grade.findOne({ assessment: assess._id, student: enrollment.student._id }).lean();
                    return {
                        _id: assess._id,
                        title: assess.title,
                        type: assess.type,
                        maxMarks: assess.maxMarks || 0,
                        weightage: assess.weightage || 0,
                        marksObtained: grade?.marksObtained ?? 0
                    };
                }));

                return {
                    _id: studentUser._id,
                    fullName: studentUser.fullName,
                    email: studentUser.email,
                    profilePic: studentUser.profilePic,
                    attendance: attendancePct,
                    assessments: assessmentsWithGrades
                };
            }));

            const avgAttendance = students.length ? (students.reduce((sum, s) => sum + s.attendance, 0) / students.length) : 0;
            const avgMarks = students.length
                ? (students.reduce((sum, s) => sum + s.assessments.reduce((a, g) => a + g.marksObtained, 0), 0) /
                    students.reduce((count, s) => count + s.assessments.length, 0))
                : 0;

            return {
                ...course,
                studentsCount: students.length,
                students,
                avgAttendance,
                avgMarks
            };
        }));

        const overallStats = {
            coursesCount: courses.length,
            studentsCount,
            avgAttendance: courseDetails.length ? (courseDetails.reduce((s, c) => s + c.avgAttendance, 0) / courseDetails.length) : 0,
            avgMarks: courseDetails.length ? (courseDetails.reduce((s, c) => s + c.avgMarks, 0) / courseDetails.length) : 0
        };

        return res.json({ status: 200, data: { overallStats, courses: courseDetails } });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: error.message || "Something went wrong" });
    }
});

// -------------------- ADD ATTENDANCE --------------------

const addAttendance = asyncHandler(async (req, res) => {
    try {
        // 1️⃣ Get faculty
        const faculty = await Faculty.findOne({ user: req.user._id });
        if (!faculty) return res.status(404).json({ status: 404, message: "Faculty not found" });
        const facultyId = faculty._id;

        // 2️⃣ Get request data
        const { courseOfferingId, date, attendance } = req.body;
        // attendance = [{ enrollmentId: "...", status: "present" | "absent" }, ...]

        if (!courseOfferingId || !date || !attendance || !Array.isArray(attendance)) {
            return res.status(400).json({ status: 400, message: "courseOfferingId, date, and attendance list are required" });
        }

        // Convert to Date object
        const attendanceDate = new Date(date);

        // 3️⃣ Start/end of day for matching existing attendance
        const startOfDay = new Date(attendanceDate);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(attendanceDate);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // 4️⃣ Fetch valid enrollments for this courseOffering
        const validEnrollments = await Enrollment.find({ offering: courseOfferingId }).select('_id').lean();
        const validEnrollmentIds = validEnrollments.map(e => e._id.toString());

        const addedOrUpdatedRecords = [];
        const skipped = [];

        // 5️⃣ Process each attendance record
        for (const record of attendance) {
            const { enrollmentId, status } = record;

            // Validate status
            if (!["present", "absent"].includes(status)) {
                skipped.push({ enrollmentId, reason: "Invalid status" });
                continue;
            }

            // Validate enrollment
            if (!validEnrollmentIds.includes(enrollmentId)) {
                skipped.push({ enrollmentId, reason: "Not enrolled in this course" });
                continue;
            }

            // Check for existing attendance on the same day
            const existing = await Attendance.findOne({
                enrollment: enrollmentId,
                date: { $gte: startOfDay, $lte: endOfDay }
            });

            if (existing) {
                // ✅ Update existing record
                existing.status = status;
                existing.markedBy = facultyId;
                await existing.save();
                addedOrUpdatedRecords.push(existing);
            } else {
                // ✅ Create new record
                const newAttendance = await Attendance.create({
                    enrollment: enrollmentId,
                    date: attendanceDate,
                    status,
                    markedBy: facultyId
                });
                addedOrUpdatedRecords.push(newAttendance);
            }
        }

        return res.status(201).json({
            status: 201,
            message: "Attendance processed successfully",
            data: addedOrUpdatedRecords,
            skipped
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message || "Something went wrong" });
    }
});



export { dashboard, addAttendance };
