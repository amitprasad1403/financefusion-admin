#Finance Fusion
Finance Fusion is a comprehensive financial management application that helps users manage their finances by providing services such as education loans, personal loans, car loans, and financial advice. This project is built using React for the frontend, Node.js and Express for the backend, and MongoDB for the database.

Table of Contents
Features
Installation
Usage
API Endpoints
Technologies Used
Contributing
License
Features
User authentication and authorization
Apply for various types of loans (education, personal, car)
Financial advice and resources
OTP-based login system
User profile management
Contact form for user inquiries
Admin panel for managing users and applications
Installation
To get a local copy of the project up and running, follow these steps:

Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/finance-fusion.git
Navigate to the project directory:
bash
Copy code
cd finance-fusion
Install backend dependencies:
bash
Copy code
cd server
npm install
Install frontend dependencies:
bash
Copy code
cd ../client
npm install
Set up environment variables:
Create a .env file in the server directory and add the following:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GMAIL_ID=your_gmail_id
GMAIL_PASSWORD=your_gmail_password
Run the application:
Open two terminal windows or tabs.

In the first terminal, start the backend server:

bash
Copy code
cd server
npm start
In the second terminal, start the frontend development server:

bash
Copy code
cd client
npm start
The application should now be running on http://localhost:3000.

Usage
Sign Up / Log In: Create an account or log in using your email and OTP.
Apply for Loans: Navigate to the application form, fill in the required details, and submit your loan application.
User Profile: View and update your profile information.
Admin Panel: Admin users can manage loan applications and user details.
API Endpoints
Authentication
POST /api/customer/login - Send OTP to email
POST /api/customer/checkLogin - Verify OTP and log in the user
User Management
GET /api/customer/details/:customer_id - Get user details
POST /api/customer/addEnquiry/:customer_id - Submit loan application
Contact
POST /api/contact_us/add - Submit contact form
Technologies Used
Frontend:

React
React Router
React Toastify
Backend:

Node.js
Express
Database:

MongoDB
Other:

JWT for authentication
Nodemailer for sending emails
Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE for more information.
 
