import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    employeeNo: {
        type: String,
        required: true,
        unique: true
    },

    designation: {
        type: String
    },
    specialization: {
        type: String
    },
    joiningDate: {
        type: Date
    }
}, { timestamps: true });

export const Faculty = mongoose.model("Faculty", facultySchema);
