import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from "../app.js";
import connectDB from "./db/index.js";

import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket.js";

// Instead of listening here, we create and export the handler function
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        credentials: true,
    },
    pingInterval: 25000,
    pingTimeout: 60000,
});

setupSocket(io, app);
app.set("io", io);

// Connect DB once before handling requests
connectDB().catch((err) => {
    console.error("Error in connection with mongoDB: ", err);
});

// ❌ REMOVE server.listen()
// ✅ Export default handler for Vercel serverless
export default function handler(req, res) {
    return server.emit("request", req, res);
}
