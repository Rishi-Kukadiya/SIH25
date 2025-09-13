import express from "express";
import { addAttendance, dashboard, updateDesignation, updateSpecialization } from "../controllers.js/faculty.controller.js";
import { facultyAuth, verifyJWT } from "../middlewares/auth.middleware.js";


const facultyRouter = express.Router();

facultyRouter.use(verifyJWT, facultyAuth);

facultyRouter.route('/dashboard').get(dashboard);
facultyRouter.route('/add-attendance').post(addAttendance)
facultyRouter.route('/update-specialization').patch(updateSpecialization)
facultyRouter.route('/update-designation').patch(updateDesignation)

export default facultyRouter;
