import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [registrationToken, setRegistrationToken] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/request/otp", { mobile }, { withCredentials: true });
      setTempToken(res.data.tempToken);
      setMessage("OTP sent!");
    } catch (err) {
      setMessage("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/verify/otp", { otp, tempToken, captcha: captchaToken }, { withCredentials: true });
      setRegistrationToken(res.data.registrationToken);
      setMessage("OTP verified! Fill your details.");
    } catch (err) {
      setMessage("OTP or Captcha invalid");
    }
  };

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/register", { name, email, password, registrationToken }, { withCredentials: true });
      setMessage("Registration complete!");
    } catch (err) {
      setMessage("Registration failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signup</h2>

      <input type="text" placeholder="Mobile" value={mobile} onChange={e => setMobile(e.target.value)} />
      <button onClick={handleOtp}>Send OTP</button>

      <br />
      <input type="text" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} />
      <ReCAPTCHA sitekey="6LfUEbArAAAAAMUKFG7UEAAeDy1wlig471n-wYxa" onChange={token => setCaptchaToken(token)} />
      <button onClick={verifyOtp}>Verify OTP</button>

      <br />
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
