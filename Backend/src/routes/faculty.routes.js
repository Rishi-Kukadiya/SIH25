import express from "express";
import { addAttendance, dashboard } from "../controllers.js/faculty.controller.js";
import { facultyAuth,verifyJWT } from "../middlewares/auth.middleware.js";


const facultyRouter = express.Router();

facultyRouter.use(verifyJWT, facultyAuth);

facultyRouter.route('/dashboard').get(dashboard);
facultyRouter.route('/add-attendance').post(addAttendance)

export default facultyRouter;
