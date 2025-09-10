import mongoose from "mongoose";

const courseOfferingSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    academicYear: {
        type: String
    },
    section: {
        type: String
    }
    // schedule: {
    //     type: Object // { day: "Mon", time: "10-11", room: "101" }
    // }
}, { timestamps: true });

export const CourseOffering = mongoose.model("CourseOffering", courseOfferingSchema);
