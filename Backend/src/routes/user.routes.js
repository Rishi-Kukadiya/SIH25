import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, editFullName, updateProfilePic, removeProfilePic, updatePhone, updateDob } from "../controllers.js/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"


const userRouter = Router()

userRouter.route('/register').post(
    upload.fields([
        {
            name: "profilePic",
            maxCount: 1
        }
    ]),
    registerUser
);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(
    verifyJWT,
    logoutUser
)
userRouter.route("/refresh-token").post(refreshAccessToken)

userRouter.route('/update-fullName').patch(verifyJWT, editFullName);
userRouter.route('/update-phone').patch(verifyJWT, updatePhone)
userRouter.route("/update-profilePic").patch(upload.fields([
    {
        name: "profilePic",
        maxCount: 1
    }
]), verifyJWT, updateProfilePic);

userRouter.route("/update-dob").patch(verifyJWT, updateDob);

userRouter.route("/remove-profilePic").patch(verifyJWT, removeProfilePic);


export default userRouter;