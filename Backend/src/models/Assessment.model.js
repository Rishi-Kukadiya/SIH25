import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
    offering: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseOffering",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["exam", "quiz", "assignment", "project"],
        required: true
    },
    maxMarks: {
        type: Number
    },
    weightage: {
        type: Number
    },
    dueDate: {
        type: Date
    }
}, { timestamps: true });

export const Assessment = mongoose.model("Assessment", assessmentSchema);
