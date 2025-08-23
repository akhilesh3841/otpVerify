import express from "express";
import mongoose from "mongoose";
import {connnectDB} from "./utils/db.js"; // spelling fix
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config(); // must be at the very top

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());   // <-- yaha lagana hoga


// Routes
app.use("/", userRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Connect to DB
connnectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
