import jwt from "jsonwebtoken";
import User from "../models/userSchema.js"; // make sure path is correct
import dotenv from "dotenv";
dotenv.config();

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user; // attach user to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
