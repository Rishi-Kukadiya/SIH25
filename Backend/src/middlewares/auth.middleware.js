import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.json(new ApiError(401, "Unauthorized request"));
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshTokens")

        if (!user) {
            return res.json(new ApiError(401, "Invalid access token"))
        }

        req.user = user;
        next();
    } catch (error) {
        // console.log(error);

        return res.json(new ApiError(401, error?.message || "Invalid access token"))
    }
})

export const facultyAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ status: 401, message: "Not authenticated" });
    }
    if (req.user.role !== "faculty") {
        return res.status(403).json({ status: 403, message: "Access denied. Faculty only." });
    }
    next();
};