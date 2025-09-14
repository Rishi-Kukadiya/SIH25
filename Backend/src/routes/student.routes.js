import { Router } from "express";
import { studentDashboard } from "../controllers.js/student.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const studentRouter = Router();

studentRouter.use(verifyJWT)
studentRouter.route('/dashboard').get(studentDashboard)

export default studentRouter;