import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    offering: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseOffering",
        required: true
    },
    status: {
        type: String,
        enum: ["enrolled", "dropped", "completed"],
        default: "enrolled"
    }
}, { timestamps: true });

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
