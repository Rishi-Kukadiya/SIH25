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

const dashboard = asyncHandler(async (req, res) => {
    try {
        // Get the actual faculty ID
        const faculty = await Faculty.findOne({ user: req.user._id });
        if (!faculty) return res.json({ status: 404, message: "Faculty not found" });

        const facultyId = faculty._id;

        // 1) Get all courses taught by faculty
        const courses = await CourseOffering.find({ faculty: facultyId })
            .populate('course', 'courseCode courseName credits')
            .lean();

        const courseIds = courses.map(c => c._id);

        // 2) Count unique students across all offerings
        const studentIds = await Enrollment.distinct("student", { offering: { $in: courseIds } });
        const studentsCount = studentIds.length;

        // 3) Build detailed course info
        const courseDetails = await Promise.all(courses.map(async (course) => {
            const enrollments = await Enrollment.find({ offering: course._id }).populate('student').lean();

            // Build students with attendance and assessments
            const students = await Promise.all(enrollments.map(async (enrollment) => {
                const studentUser = await User.findById(enrollment.student.user).select('fullName email profilePic').lean();

                // Attendance for this student in this course
                const attendanceRecords = await Attendance.find({ enrollment: enrollment._id }).lean();
                const total = attendanceRecords.length;
                const presentCount = attendanceRecords.filter(a => a.status === "present").length;
                const attendancePct = total ? (presentCount / total) * 100 : 0;

                // Assessments for this course for this student
                const assessmentsInCourse = await Assessment.find({ offering: course._id }).lean();
                const assessmentsWithGrades = await Promise.all(assessmentsInCourse.map(async (assess) => {
                    const grade = await Grade.findOne({ assessment: assess._id, student: enrollment.student._id }).lean();
                    return {
                        _id: assess._id,
                        title: assess.title,
                        type: assess.type,
                        maxMarks: assess.maxMarks || 0,
                        weightage: assess.weightage || 0,
                        marksObtained: grade?.marksObtained || 0
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

            // Average attendance for course
            const avgAttendance = students.length ? (students.reduce((sum, s) => sum + s.attendance, 0) / students.length) : 0;

            // Average marks for course
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

export { dashboard };
