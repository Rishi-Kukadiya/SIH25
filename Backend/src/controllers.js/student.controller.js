import { asyncHandler } from "../utils/asyncHandler.js";
import { Enrollment } from "../models/Enrollment.model.js";
import { Attendance } from "../models/Attendance.model.js";
import { Assessment } from "../models/Assessment.model.js";
import { Grade } from "../models/Grade.model.js";
import { Student } from "../models/Student.model.js";

const studentDashboard = asyncHandler(async (req, res) => {
    try {
        // 1️⃣ Find the student by user
        console.log(req.user._id);
        const student = await Student.findOne({ user: req?.user?._id });
        console.log(student);



        if (!student) return res.status(404).json({ status: 404, message: "Student not found" });

        const studentId = student._id;

        // 2️⃣ Find all enrollments for this student
        const enrollments = await Enrollment.find({ student: studentId })
            .populate({
                path: "offering",
                populate: [
                    { path: "course", select: "courseCode courseName credits" },
                    { path: "faculty", populate: { path: "user", select: "fullName email profilePic" } }
                ]
            })
            .lean();
        
        console.log(enrollments);
        

        // 3️⃣ For each enrollment, attach attendance + assessments + grades
        const courses = await Promise.all(enrollments.map(async (enrollment) => {
            const offering = enrollment.offering;

            // Attendance
            const attendanceRecords = await Attendance.find({ enrollment: enrollment?._id }).lean();
            const total = attendanceRecords.length;
            const presentCount = attendanceRecords.filter(a => a.status === "present").length;
            const attendancePct = total ? (presentCount / total) * 100 : 0;

            // Assessments + Grades
            const assessmentsInCourse = await Assessment.find({ offering: offering._id }).lean();
            const assessmentsWithGrades = await Promise.all(assessmentsInCourse.map(async (assess) => {
                const grade = await Grade.findOne({ assessment: assess._id, student: studentId }).lean();
                return {
                    _id: assess._id,
                    title: assess.title,
                    type: assess.type,
                    maxMarks: assess.maxMarks || 0,
                    weightage: assess.weightage || 0,
                    marksObtained: grade?.marksObtained ?? null
                };
            }));

            // Avg marks in this course
            const marks = assessmentsWithGrades.map(a => a.marksObtained).filter(m => m !== null);
            const avgMarks = marks.length ? (marks.reduce((a, b) => a + b, 0) / marks.length) : 0;

            return {
                courseId: offering.course._id,
                courseCode: offering.course.courseCode,
                courseName: offering.course.courseName,
                credits: offering.course.credits,
                faculty: {
                    _id: offering.faculty._id,
                    fullName: offering.faculty.user.fullName,
                    email: offering.faculty.user.email,
                    profilePic: offering.faculty.user.profilePic
                },
                attendance: attendancePct,
                assessments: assessmentsWithGrades,
                avgMarks
            };
        }));

        // 4️⃣ Calculate overall stats
        const overallStats = {
            coursesCount: courses.length,
            avgAttendance: courses.length ? (courses.reduce((sum, c) => sum + c.attendance, 0) / courses.length) : 0,
            avgMarks: courses.length ? (courses.reduce((sum, c) => sum + c.avgMarks, 0) / courses.length) : 0
        };

        return res.json({
            status: 200,
            data: {
                student: {
                    _id: student._id,
                    enrollmentNo: student.enrollmentNo,
                    batchYear: student.batchYear,
                    currentSemester: student.currentSemester,
                    address: student.address
                },
                overallStats,
                courses
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message || "Something went wrong" });
    }
});

export { studentDashboard };
