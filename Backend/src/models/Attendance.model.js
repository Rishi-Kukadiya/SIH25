import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    enrollment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: true
    },
    markedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    }
}, { timestamps: true });

export const Attendance = mongoose.model("Attendance", attendanceSchema);
