import jwt from "jsonwebtoken";
import {User} from "../models/userSchema.js"; // your mongoose model
import {sendOTP} from "../temp/sendOTP.js"; // import sendOTP function
import dotenv from "dotenv";
import axios from "axios"
dotenv.config();




export const requestOTP = async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) return res.status(400).json({ msg: "Mobile required" });

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return res.status(400).json({ msg: "Mobile number already registered" });
        }

        // Create temporary token with mobile
        const tempToken = jwt.sign({ mobile }, process.env.TEMP_SECRET, { expiresIn: '10m' });

        // Send OTP to mobile
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        await sendOTP(mobile, otp);

        // Optional: store OTP in DB or cache

        res.status(200).json({ msg: "OTP sent", tempToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

export const verifyOTP = async (req, res) => {
    const { otp, tempToken  } = req.body;

    if (!otp || !tempToken ) return res.status(400).json({ msg: "All fields required" });

    //   const captchaVerify = await axios.post(
    //         `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
    //     );
    //     if (!captchaVerify.data.success) return res.status(400).json({ msg: "Captcha invalid" });


    try {
        // Decode temporary token
        const decoded = jwt.verify(tempToken, process.env.TEMP_SECRET);

        // Verify OTP (check against DB or cache)
        const isOtpValid = true; // replace with actual OTP verification
        if (!isOtpValid) return res.status(400).json({ msg: "OTP invalid" });

        // OTP & captcha valid → issue new token for completing registration
        const registrationToken = jwt.sign({ mobile: decoded.mobile }, process.env.REG_SECRET, { expiresIn: '15m' });

        res.status(200).json({ msg: "OTP verified", registrationToken });
    } catch (err) {
        res.status(400).json({ msg: "Invalid or expired token" });
    }
};



// Step 3: Complete registration with full details
export const register = async (req, res) => {
    const { name, email, password, registrationToken } = req.body;

    if (!name || !email || !password || !registrationToken)
        return res.status(400).json({ msg: "All fields required" });

    try {
        // Verify registration token
        const decoded = jwt.verify(registrationToken, process.env.REG_SECRET);

        // Create user
        const user = await User.create({
            name,
            email,
            mobile: decoded.mobile,
            password, // make sure to hash before saving
            isVerified: true
        });

        // Issue final auth token
        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("authToken", authToken, {
    httpOnly: true,   // frontend JS cannot access
    secure: process.env.NODE_ENV === "production", // only HTTPS in production
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
res.status(201).json({ msg: "User registered" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};




export const login=async(req,res)=>{
    const {mobile,password}=req.body;
    if(!mobile || !password) return res.status(400).json({msg:"All fields required"});

    try {
        const user=await User.findOne({mobile});
        if(!user) return res.status(404).json({msg:"User not found"});

        if(user.password!==password) // replace with hashed password comparison
            return res.status(401).json({msg:"Invalid credentials"});

        const authToken=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        res.cookie("authToken",authToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:7*24*60*60*1000
        });
    res.status(200).json({
      message: "Login successful.",
      data:user,
    });
        
    } catch (error) {
        res.status(500).json({msg:"Server error"});   
    }
}

