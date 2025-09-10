import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    hod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    }
}, { timestamps: true });

export const Department = mongoose.model("Department", departmentSchema);
