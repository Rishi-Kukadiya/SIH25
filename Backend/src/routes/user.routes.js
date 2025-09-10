import { Router } from "express";
import { registerUser,loginUser } from "../controllers.js/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

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
export default userRouter;