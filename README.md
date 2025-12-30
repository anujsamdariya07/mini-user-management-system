# Mini User Management System

## Project Overview

The Mini User Management System is a full-stack web application designed to manage user accounts with secure authentication and role-based access control (RBAC).  

The application allows users to:
- Sign up and log in securely
- View and update their profile
- Change their password

Admins have additional privileges to:
- View all users with pagination
- Activate or deactivate user accounts

This project demonstrates backend authentication flows, API security, RBAC, clean architecture, and full-stack integration.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- Cookie-parser
- CORS
- Jest & Supertest (Testing)

### Frontend
- React (Vite)
- Zustand (State Management)
- Axios
- React Router DOM
- Tailwind CSS
- React Hot Toast

### Deployment
- Backend: Render  
- Frontend: Vercel  
- Database: MongoDB Atlas  

---

## Setup Instructions (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/anujsamdariya07/mini-user-management-system.git
cd mini-user-management-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside the backend folder.
```bash
npm run dev
```
Backend will run on:
```bash
http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on:
```bash
http://localhost:5173
```

## Environment Variables
Backend `.env`
```bash
PORT=
MONGO_URI=
JWT_SECRET=
NODE_ENV=
```

## Deployment Instructions

### Backend Deployment (Render)
1. Create a new Web Service on Render

2. Connect GitHub repository

3. Set root directory to /backend

4. Add environment variables in Render dashboard

5. Deploy

### Frontend Deployment (Vercel)

1. Import GitHub repository into Vercel

2. Set root directory to /frontend

3. Add environment variable VITE_API_BASE_URL

4. Deploy

## API Documentation

### 1. Authentication Routes (`/api/auth`)

#### i. Signup
POST `/signup`
Request:
```bash
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```
Response:
```bash
{
  "message": "User registered successfully.",
  "user": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### ii. Signin
POST (`/signin`)
Request:
```bash
{
  "email": "john@example.com",
  "password": "Password@123"
}
```
Response:
```bash
{
  "message": "Login successful!",
  "user": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

#### iii. Get Current User
GET `/check`
(Protected Route)

#### iv. Logout
POST `/logout`

### 2. User Routes (`/api/users`)

#### i. Get Profile
GET `/me`

#### ii. Update Profile
PUT `/me`
Request:
```bash
{
  "fullName": "Updated Name",
  "email": "updated@example.com"
}
```

#### iii. Change Password
PUT `/me/password`
Request:
```bash
{
  "currentPassword": "OldPassword@123",
  "newPassword": "NewPassword@123"
}
```

### 3. Admin Routes (`/api/admin`)

#### i. Get All Users (Paginated)
GET `/users/:page`

#### ii. Activate User
PATCH `/users/:page`

#### iii. Deactivate User
PATCH `/users/:id/deactivate`

## Testing
- Backend unit & integration tests written using Jest and Supertest

- Tests cover:
  -  Signup
  -  Login
  -  Inactive user login restriction
  -  Protected routes
  -  Admin-only access

Run tests:
```bash
pnpm test
```

## Key Features Summary

- JWT-based authentication with HTTP-only cookies

- Role-based access control (Admin / User)

- Secure password hashing

- Protected routes

- Clean REST API design

- Pagination support

- Responsive UI

- Production-ready deployment