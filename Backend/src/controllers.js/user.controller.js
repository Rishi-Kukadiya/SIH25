import { University } from "../models/University.model.js"
import { Student } from "../models/Student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Faculty } from "../models/Faculty.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { deleteImageFromCloudinary } from "../utils/cloudinary.js";
import { Department } from "../models/Department.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        return res.json({ error: true, status: 500, message: "Error while generating tokens" });
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

        let universityname = universityName?.toLowerCase();

        const university = await University.findOne({ name: universityname });
        if (!university) {
            return res.json({ status: 400, message: "University not registered" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ status: 400, message: "User already exists with this email id" });
        }

        let departmentDoc = null;
        if (department) {
            departmentDoc = await Department.findOne({ name: department.trim()?.toLowerCase() });
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

        let profile;
        if (profilePicLocalPath) {
            profile = await uploadOnCloudinary(profilePicLocalPath);
            if (!profile) {
                return res.json({ status: 500, message: "Error while uploading on cloudinary" });
            }
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
            profilePic: profile?.secure_url || null,
            university: university._id,
        });

        if (role === "student") {
            const existingStudent = await Student.findOne({ enrollmentNo });
            if (existingStudent) {
                await User.deleteOne({ _id: user?._id });
                return res.json({ status: 400, message: `Enrollment number ${enrollmentNo} already exists` });
            }

            if (!enrollmentNo) {
                await User.deleteOne({ _id: user?._id });
                return res.json({ status: 400, message: "Enrollment number is required for student" });
            }

            await Student.create({
                user: user?._id,
                enrollmentNo
            });
        }

        if (role === "faculty") {
            if (!enrollmentNo) {
                const existingFaculty = await Faculty.findOne({ employeeNo: enrollmentNo });
                if (existingFaculty) {
                    await User.deleteOne({ _id: user?._id });
                    return res.json({ status: 400, message: `Employee number ${enrollmentNo} already exists` });
                }

                await User.deleteOne({ _id: user?._id });
                return res.json({ status: 400, message: "Employee number is required for faculty" });
            }

            await Faculty.create({
                user: user?._id,
                employeeNo: enrollmentNo
            });
        }

        return res.status(201).json({ status: 201, message: "Registration successful", userId: user?._id, role });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: error.message || "Something went wrong" });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(await bcrypt.hash(password, 10));

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


const logoutUser = asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: "" }
        },
        { new: true }
    );

    console.log("Updated user after logout:", updatedUser);

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ status: 200, message: "User loggedOut successfully" });
});



const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incommingRefreshToken) {
        return res.json({ status: 401, message: "Unauthorized request" })
    }
    try {
        const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            return res.json(new ApiError(401, "Invalid refreshToken"));
        }
        if (incommingRefreshToken != user.refreshToken) {
            // console.log(incommingRefreshToken);
            return res.json(new ApiError(401, "Refresh token is expired or used"));
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                status: 200,
                accessToken,
                refreshToken: newRefreshToken,
                message: "Access token refreshed Successfully"
            }
            );


    } catch (error) {
        return res.json({ status: 401, message: error?.message || "invalid refresh token" })

    }
})



const editFullName = asyncHandler(async (req, res) => {

    const userId = req?.user?._id;
    const { fullName } = req.body;
    console.log(userId, fullName);

    if (!fullName) {
        res.json({ status: 400, message: "Fullname is required." });
    }

    await User.findByIdAndUpdate(userId, { $set: { fullName: fullName } });


    return res.status(200).json({ status: 200, message: "fullName updated successfully." })
})


const updateProfilePic = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id;
        const profilePicLocalPath = req.files?.profilePic?.[0]?.path;

        if (!profilePicLocalPath) {
            return res.json({ status: 400, message: "Profile picture file is required." });
        }
        const profilePic = await uploadOnCloudinary(profilePicLocalPath);

        if (!profilePic) {
            return res.json({ status: 500, message: "Error while uploading profile picture on cloudinary" });
        }

        const user = await User.findById(userId).select("profilePic");

        if (user?.profilePic) {
            deleteImageFromCloudinary(user.profilePic);
        }

        user.profilePic = profilePic.secure_url;
        const updatedUser = await user.save();

        return res.json(
            { status: 200, updatedUser, message: "Profile picture updated successfully." }
        );

    } catch (error) {
        console.log(error.message);
        return res.json(
            { status: 500, message: "Error while updating profile picture." }
        );
    }
});


const removeProfilePic = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id;

        const user = await User.findById(userId).select("profilePic");

        if (!user) {
            return res.json(new ApiError(404, "User not found"));
        }
        const DEFAULT_PROFILE_PIC = "https://res.cloudinary.com/dotjcgaai/image/upload/v1757675840/default-avatar-icon-of-social-media-user-vector_qybelz.jpg"
        if (user.profilePic && user.profilePic !== DEFAULT_PROFILE_PIC) {
            deleteImageFromCloudinary(user.profilePic);
        }

        user.profilePic = DEFAULT_PROFILE_PIC;

        const updatedUser = await user.save();

        return res.json(
            { status: 200, updatedUser, message: "Profile picture removed successfully and set to default." }
        );

    } catch (error) {
        console.log(error.message);
        return res.json(
            { status: 500, message: "Error while removing profile picture." }
        );
    }
});


const updatePhone = asyncHandler(async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.json({ status: 400, message: "Phone is required." })
        }
        await User.findByIdAndUpdate(req.user._id, { $set: { phone: phone } });

        return res.json({ status: 200, message: "Phone number updated successfully" })
    } catch (error) {
        console.log(error.message);
        return res.json(
            { status: 500, message: "Error while removing profile picture." }
        );

    }
}
)


const updateDob = asyncHandler(async (req, res) => {
    try {
        const { dob } = req.body;

        if (!dob) {
            return res.status(400).json({ status: 400, message: "DOB is required." });
        }

        const parsedDob = new Date(dob);
        if (isNaN(parsedDob.getTime())) {
            return res.status(400).json({ status: 400, message: "Invalid DOB format." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { dob: parsedDob } },
            { new: true, runValidators: true }
        ).select(" fullName dob");

        if (!updatedUser) {
            return res.status(404).json({ status: 404, message: "User not found." });
        }

        return res.json({ status: 200, message: "DOB updated successfully", data: updatedUser });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ status: 500, message: error || "Error while updating DOB." });
    }
});


export { registerUser, loginUser, editFullName, logoutUser, refreshAccessToken, updateProfilePic, removeProfilePic, updatePhone, updateDob };
