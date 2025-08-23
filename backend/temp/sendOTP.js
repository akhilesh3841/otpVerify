// utils/sendOTP.js
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();


const accountSid = process.env.TWILIO_SID;        // Twilio account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;  // Twilio auth token
const fromNumber = process.env.TWILIO_PHONE;      // Twilio verified number

const client = twilio(accountSid, authToken);

export const sendOTP = async (mobile, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      from: fromNumber,
      to: mobile
    });


    console.log("OTP sent:", message.sid);
    return true;
  } catch (err) {
        console.log("SID:", accountSid);
console.log("Auth Token:", authToken);
console.log("From Number:", fromNumber);

    console.error("Error sending OTP:", err.message);
    throw new Error("Failed to send OTP");
  }
};
