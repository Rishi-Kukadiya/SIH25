import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    marksObtained: {
        type: Number
    },
    gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    gradedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const Grade = mongoose.model("Grade", gradeSchema);
