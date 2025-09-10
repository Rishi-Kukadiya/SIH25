import { User } from "../models/user.model.js";
import { University } from "../models/university.model.js";
import { Student } from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Faculty } from "../models/faculty.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Department } from "../models/Department.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        return { error: true, status: 500, message: "Error while generating tokens" };
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            enrollmentNo,
            department,
            dob,
            universityName
        } = req.body;

        const university = await University.findOne({ name: universityName.toLowerCase() });
        if (!university) {
            return res.json({ status: 400, message: "University not registered" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ status: 400, message: "User already exists with this email id" });
        }

        let departmentDoc = null;
        if (department) {
            departmentDoc = await Department.findOne({ name: department.trim().toLowerCase() });
            if (!departmentDoc) {
                return res.json({ status: 400, message: "Department not found" });
            }
        }

        let role = null;
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const studentRegex = new RegExp(escapeRegex(university.student_suf) + "$", "i");
        const facultyRegex = new RegExp(escapeRegex(university.faculty_suf) + "$", "i");

        if (facultyRegex.test(email)) {
            role = "faculty";
        } else if (studentRegex.test(email)) {
            role = "student";
        } else {
            return res.json({ status: 400, message: "Email domain does not match university" });
        }

        const profilePicLocalPath = req.files?.profilePic[0]?.path;

        if (!profilePicLocalPath) {
            return res.json({ status: 400, message: "Avatar file is required." });
        }

        const profilePic = await uploadOnCloudinary(profilePicLocalPath);
        if (!profilePic) {
            return res.json({ status: 500, message: "Error while uploading on cloudinary" });
        }

        let parsedDob = null;
        if (dob) {
            if (dob.includes("/")) {
                const [day, month, year] = dob.split("/");
                parsedDob = new Date(`${year}-${month}-${day}`);
            } else {
                parsedDob = new Date(dob);
            }
        }

        const user = await User.create({
            fullName,
            email,
            password,
            role,
            dob: parsedDob,
            department: departmentDoc ? departmentDoc._id : null,
            profilePic: profilePic?.secure_url,
            university: university._id,
        });

        if (role === "student") {
            const existingStudent = await Student.findOne({ enrollmentNo });
            if (existingStudent) {
                await User.deleteOne({ _id: user._id });
                return res.json({ status: 400, message: `Enrollment number ${enrollmentNo} already exists` });
            }

            if (!enrollmentNo) {
                await User.deleteOne({ _id: user._id });
                return res.json({ status: 400, message: "Enrollment number is required for student" });
            }

            await Student.create({
                user: user._id,
                enrollmentNo
            });
        }

        if (role === "faculty") {
            if (!enrollmentNo) {
                const existingFaculty = await Faculty.findOne({ employeeNo: enrollmentNo });
                if (existingFaculty) {
                    await User.deleteOne({ _id: user._id });
                    return res.json({ status: 400, message: `Employee number ${enrollmentNo} already exists` });
                }

                await User.deleteOne({ _id: user._id });
                return res.json({ status: 400, message: "Employee number is required for faculty" });
            }

            await Faculty.create({
                user: user._id,
                employeeNo: enrollmentNo
            });
        }

        return res.status(201).json({ status: 201, message: "Registration successful", userId: user._id, role });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: error.message || "Something went wrong" });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ status: 400, message: "Email and password are required" });
        }

        const user = await User.findOne({ email })
            .populate({ path: "department", select: "name code", strictPopulate: false })
            .populate("university", "name address");

        if (!user) {
            return res.json({ status: 404, message: "User does not exist!" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.json({ status: 401, message: "Password is incorrect" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        let detailedUser = user.toObject();
        delete detailedUser.password;
        delete detailedUser.refreshToken;

        if (user.role === "student") {
            const studentDetails = await Student.findOne({ user: user._id })
                .populate({ path: "department", select: "name code", strictPopulate: false });
            detailedUser.student = studentDetails;
        } else if (user.role === "faculty") {
            const facultyDetails = await Faculty.findOne({ user: user._id })
                .populate({ path: "department", select: "name code", strictPopulate: false });
            detailedUser.faculty = facultyDetails;
        }

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json({ status: 200, detailedUser, accessToken, message: "User logged in successfully" });

    } catch (error) {
        console.error("Login Error:", error);
        return res.json({ status: 500, message: error.message || "Something went wrong during login" });
    }
});

export { registerUser, loginUser };
