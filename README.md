Government Portal User Authentication

This project is a user authentication system for a government portal, featuring signup with OTP verification using Twilio, and login/logout functionality. The frontend is built in React and the backend is powered by Node.js + Express + MongoDB. Tailwind CSS is used for styling the pages.

Features
Signup with OTP Verification

Users register using their mobile number.

A 6-digit OTP is sent to the user via Twilio SMS.

OTP is temporary and expires in 10 minutes.

Upon OTP verification, users can complete their registration with:

Full Name

Email

Password

Prevents duplicate mobile numbers from registering.

Login

Users can login using their registered mobile number and password.

Validates credentials against the database.

Displays error messages for invalid login attempts.

Logout

Users can log out of their session (if using cookies or token-based authentication on frontend/backend).

Frontend

Built with React using Tailwind CSS.

Clean and responsive government-portal style design.

OTP input, registration form, and messages properly handled.

Backend

Node.js + Express for API endpoints:

/request/otp → Sends OTP to mobile using Twilio.

/verify/otp → Verifies OTP and issues a temporary registration token.

/register → Registers the user after OTP verification.

/login → Logs in user using mobile + password.

MongoDB stores users securely.

JWT tokens used for temporary registration verification.

Setup Instructions
1. Clone the Repository
git clone <your-repo-url>
cd <project-folder>

2. Install Dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3. Configure Environment Variables

Create a .env file in the backend folder with:

MONGO_URI=<your_mongodb_connection_string>
TWILIO_ACCOUNT_SID=<your_twilio_account_sid>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_SERVICE_SID=<your_twilio_service_sid>
TEMP_SECRET=<your_jwt_temp_secret>

4. Start the Backend Server
cd backend
npm run dev

5. Start the Frontend
cd frontend
npm start

Usage

Open the application in your browser.

Signup using your mobile number:

Enter mobile → Send OTP → Enter OTP → Complete registration form.

Login using registered mobile + password.

Logout (if implemented) to end the session.

Notes

OTP is sent via Twilio SMS, ensure your Twilio account is active.

Temporary tokens are JWTs and expire in 10 minutes.

Passwords are stored securely in hashed form in MongoDB.

Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express

Database: MongoDB (Mongoose)

SMS Service: Twilio

Authentication: JWT for OTP verification
