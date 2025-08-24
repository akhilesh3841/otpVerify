import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [mobile, setMobile] = useState("+91");
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [registrationToken, setRegistrationToken] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Send OTP
  const handleOtp = async () => {
    // Basic mobile validation
    if (!/^\+91\d{10}$/.test(mobile)) {
      setMessage("Enter valid 10-digit Indian mobile number with +91");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/request/otp", { mobile });
      setTempToken(res.data.tempToken);
      setMessage("OTP sent to your mobile!");
    } catch (err) {
      setMessage(err?.response?.data?.msg || "Failed to send OTP");
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Enter the OTP");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/verify/otp",
        { otp, tempToken }
      );
      setRegistrationToken(res.data.registrationToken);
      setMessage("✅ OTP verified! Now complete your registration.");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("❌ OTP invalid or expired");
    }
  };

  // Register User
  const register = async () => {
    if (!name || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Enter a valid email");
      return;
    }
    if (password.length < 6) {
      setMessage("Password should be at least 6 characters");
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        registrationToken,
      });
      setMessage("🎉 Registration complete!");
      // Optionally reset form
      setMobile("+91");
      setOtp("");
      setTempToken("");
      setRegistrationToken("");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">
          Municipal Corporation Gorakhpur
          <br />
          <span className="text-sm text-gray-600">Pet Registration Portal</span>
        </h2>

        {/* Mobile + OTP section (show only if OTP not verified) */}
        {!registrationToken && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={handleOtp}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send OTP
            </button>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Registration form (only show after OTP verification) */}
        {registrationToken && (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={register}
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Register
            </button>
          </div>
        )}

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
