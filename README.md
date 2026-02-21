# 🚀 Backend Developer Assignment

## 📌 Overview

This project is a **scalable REST API with authentication and role-based access control**, along with a basic frontend dashboard to demonstrate API usage.

It includes secure authentication, task management, and admin-level control over system data.

---

## 🛠 Tech Stack

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

### Frontend:

* React.js / Next.js
* Axios / Fetch API

---

## 🔐 Features

### Authentication

* User Registration
* User Login
* Password hashing using bcrypt
* JWT-based authentication
* Protected routes

---

### Role-Based Access Control

* **User**

  * Can create, view, update, and delete their own tasks

* **Admin**

  * Can view all users' tasks
  * Can delete any task
  * System-level visibility

---

### Task Management (CRUD APIs)

* Create Task
* Get Tasks (role-based filtering)
* Update Task
* Delete Task

---

### API Design

* RESTful APIs
* Proper HTTP status codes
* Centralized error handling
* Input validation

---

### Frontend Features

* User login & registration
* Protected dashboard
* Create/Edit/Delete tasks
* Admin dashboard (view all tasks)
* Success & error messages
* Clean and minimal UI

---

## 📂 Project Structure

```
backend/
  ├── controllers/
  ├── routes/
  ├── models/
  ├── middlewares/
  ├── config/
  └── server.js

frontend/
  ├── components/
  ├── pages/
  └── services/
```

---

## 🔗 API Endpoints

### Auth

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### Tasks

* `GET /api/v1/tasks`
* `POST /api/v1/tasks`
* `PUT /api/v1/tasks/:id`
* `DELETE /api/v1/tasks/:id`

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-link>
cd project-folder
```

### 2. Install Dependencies

```
npm install
```

### 3. Setup Environment Variables

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run Server

```
npm run dev
```

---

## 📦 API Documentation

* Postman Collection is included in the repository

---

## 🧠 Scalability & Improvements

This project is designed to scale with future enhancements:

* Can be split into **microservices** (Auth Service, Task Service)
* Add **Redis caching** for faster read operations
* Use **NGINX load balancer** for handling traffic
* Implement **queue systems (BullMQ)** for background jobs
* Add **Docker support** for containerized deployment
* Introduce **rate limiting & logging (Winston/Morgan)**

---

## 🔒 Security Practices

* Password hashing using bcrypt
* JWT token-based authentication
* Protected API routes
* Input validation & sanitization
* Environment variables for sensitive data

---

## 📸 Screenshots

(Add your dashboard screenshots here)

---

## 👨‍💻 Author

**Ayush Bhardwaj**

---

## 📬 Submission

This project is submitted as part of the Backend Developer Internship assignment.

---
