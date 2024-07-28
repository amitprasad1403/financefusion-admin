# Finance Fusion

Finance Fusion is a comprehensive financial management application that helps users manage their finances by providing services such as education loans, personal loans, car loans, and financial advice. This project is built using React for the frontend, Node.js and Express for the backend, and MongoDB for the database.



# Table of Contents
* Features
* Installation
* Usage
* API Endpoints
* Technologies Used
* Contributing
* License

# Features
* User authentication and authorization
* Apply for various types of loans (education, personal, car)
* Financial advice and resources
* OTP-based login system
* User profile management
* Contact form for user inquiries
* Admin panel for managing users and applications 

# Usage
* Sign Up / Log In: Create an account or log in using your email and OTP.
* Apply for Loans: Navigate to the application form, fill in the required details, and submit your loan application.
* User Profile: View and update your profile information.
* Admin Panel: Admin users can manage loan applications and user details.

# API Endpoints
### Authentication
* POST /api/customer/login - Send OTP to email
* POST /api/customer/checkLogin - Verify OTP and log in the user

### User Management
* GET /api/customer/details/:customer_id - Get user details
* POST /api/customer/addEnquiry/:customer_id - Submit loan application

### Contact
* POST /api/contact_us/add - Submit contact form

# Technologies Used
### Frontend:
* React
* React Router
* React Toastify

### Backend:
* Node.js
* Express

### Database:
* MongoDB

# Other:
* JWT for authentication
* Nodemailer for sending emails

## App preview

![image](https://github.com/amitprasad1403/financefusion-admin/blob/main/FF1.png)
![image](https://github.com/amitprasad1403/financefusion-admin/blob/main/FF2.png)
![image](https://github.com/amitprasad1403/financefusion-admin/blob/main/FF3.png)
![image](https://github.com/amitprasad1403/financefusion-admin/blob/main/FF4.png)
![image](https://github.com/amitprasad1403/financefusion-admin/blob/main/FF5.png)
![image](https://github.com/amitprasad1403/financefusion-admin/blob/main/FF6.png)


 
