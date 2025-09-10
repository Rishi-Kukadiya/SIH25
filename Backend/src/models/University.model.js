import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String
    },
    contact_email: {
        type: String,
        unique: true,
        trim: true
    },
    contact_phone: {
        type: String
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    admin_password: {
        type: String,
        required: [true, "Password is required"],
    },
    faculty_suf: {
        type:String
    },
    student_suf: {
        type:String
    }
}, { timestamps: true });

universitySchema.pre("save", async function (next) {
    if (!this.isModified("admin_password")) return next();
    this.admin_password = await bcrypt.hash(this.admin_password, 10);
    next();
});

universitySchema.methods.isPasswordCorrect = async function (password) {
    if (!password) return false;
    return await bcrypt.compare(password, this.admin_password);
};

universitySchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, admin_id: admin_id, name: this.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

universitySchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export const University = mongoose.model("University", universitySchema);
