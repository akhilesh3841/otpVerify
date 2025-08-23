import express from "express";

import {verifyOTP,requestOTP,register,login} from "../controllers/userController.js";


const router=express.Router();


router.post("/request/otp",requestOTP);
router.post("/verify/otp",verifyOTP);
router.post("/register",register);
router.post("/login",login);

export default router;