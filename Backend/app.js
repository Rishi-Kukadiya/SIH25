import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();
import dotenv from "dotenv";
dotenv.config();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.get('/health', (req, res) => res.json({ ok: true, message:"API working" }));


import userRouter from "./src/routes/user.routes.js";
import facultyRouter from "./src/routes/faculty.routes.js";
import studentRouter from "./src/routes/student.routes.js";


app.use("/api/v1/users", userRouter);

app.use('/api/v1/faculty', facultyRouter);

app.use('/api/v1/student', studentRouter);




export { app }