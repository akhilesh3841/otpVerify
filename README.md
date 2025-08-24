🏛️ Government Portal User Authentication

This project implements a secure user authentication system for a government portal. It features OTP-based signup using Twilio, login/logout functionality, and a clean, responsive UI built with React and Tailwind CSS.

🚀 Features
Signup with OTP Verification

Users register using their mobile number.

A 6-digit OTP is sent via Twilio SMS.

OTP is temporary and expires after 10 minutes.

Only unregistered mobile numbers can request OTP.

After OTP verification, users complete registration with:

Full Name

Email

Password

Login

Users login using registered mobile number and password.

Proper validation ensures correct credentials.

Displays clear success/error messages.

Logout

Users can logout to terminate the session.

Supports token or cookie-based authentication.

🖥️ Frontend

Built with React and Tailwind CSS.

Clean, government portal style UI.

Responsive layout for desktop and mobile.

Conditional rendering ensures:

OTP section only shows before verification

Registration form shows after OTP verification

⚙️ Backend

Built with Node.js and Express.

MongoDB for storing user data securely.

JWT tokens for temporary registration verification.

API Endpoints
Endpoint	Method	Description
/request/otp	POST	Send OTP to mobile via Twilio
/verify/otp	POST	Verify OTP and issue temporary registration token
/register	POST	Complete registration after OTP verification
/login	POST	Login with mobile and password
🛠️ Setup Instructions
1️⃣ Clone the Repository
git clone <your-repo-url>
cd <project-folder>

2️⃣ Install Dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3️⃣ Configure Environment Variables

Create a .env file in backend folder:

MONGO_URI=<your_mongodb_connection_string>
TWILIO_ACCOUNT_SID=<your_twilio_account_sid>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_SERVICE_SID=<your_twilio_service_sid>
TEMP_SECRET=<your_jwt_temp_secret>

4️⃣ Start Backend Server
cd backend
npm run dev

5️⃣ Start Frontend
cd frontend
npm start

🎯 Usage

Open the portal in your browser.

Signup using your mobile number:

Enter mobile → Send OTP → Enter OTP → Fill registration form.

Login using registered mobile + password.

Logout to end session.

💡 Notes

OTP is sent via Twilio SMS, ensure your Twilio account is active.

JWT-based temporary tokens expire in 10 minutes.

Passwords are hashed in MongoDB for security.

Frontend validation ensures mobile/email/password formats are correct.

🛠️ Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express

Database: MongoDB (Mongoose)

SMS Service: Twilio

Authentication: JWT
