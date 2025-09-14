import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    enrollmentNo: {
        type: String,
        required: true,
        unique: true
    },
    batchYear: {
        type: Number
    },
    currentSemester: {
        type: Number
    },
    address: {
        type: String
    }
}, { timestamps: true });

export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
