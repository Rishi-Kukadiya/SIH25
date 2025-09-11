import express from "express";
import { dashboard } from "../controllers.js/faculty.controller.js";
import { facultyAuth,verifyJWT } from "../middlewares/auth.middleware.js";


const facultyRouter = express.Router();

facultyRouter.use(verifyJWT, facultyAuth);

facultyRouter.route('/dashboard').get(dashboard);

export default facultyRouter;
