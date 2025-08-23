import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connnectDB=async()=>{
    try {
        await mongoose.connect(process.env.db_secret,{
            dbName:"otpVerify"
        }).then(()=>{
            console.log("DB connected");
        })
    } catch (error) {
        console.log("DB connection error",error);
    }
}



