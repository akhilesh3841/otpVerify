import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [mobile, setMobile] = useState("+91");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {

    try {
      const response = await axios.post(
        "http://localhost:5000/login", 
        { mobile, password },
        { withCredentials: true }
      );
      console.log(response.data);
      setMessage("✅ Login Successful!");
      // Optional: redirect user to dashboard
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("❌ Invalid mobile number or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">
          Government Official Login
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>
        </div>

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

export default Login;
