# BlogKaro - MERN Stack Blogging Application

BlogKaro is a full-featured blogging platform built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to register, log in, create blog posts with images and categories, view detailed posts, add comments, and more.

## Features

- User authentication with JWT
- Create, update, and delete blog posts
- Upload and display images with Multer
- Categorize posts with tags
- View full post details with timestamps
- Comment on posts
- Search functionality
- Responsive UI using Tailwind CSS

## Tech Stack

- **Frontend:** React, React Router, Axios, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer, JWT

## Project Structure

```bash
BLOGGING/
├── backend/                # Express backend
│   ├── routes/             # API route handlers (auth, posts, comments, users)
│   ├── models/             # Mongoose schemas
│   ├── images/             # Uploaded images
│   ├── index.js            # Entry point of backend
│   ├── verifyToken.js      # Middleware for JWT token validation
│   └── .env                # Environment variables
│
└── frontend/               # React frontend (Vite + Tailwind)
    ├── public/             # Static assets
    ├── src/                # React components, pages, context
    ├── index.html
    └── tailwind.config.js
```

Getting Started
1. Clone the repository
```bash
git clone https://github.com/Prithiraj57/blog-app.git
cd blog-app
``` 
2. Backend Setup
```bash
cd backend
npm install
```
3.Create a .env file in the backend folder:
.env
```bash
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```bash
nodemon index.js
```
3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Notes:
MongoDB must be running locally or via MongoDB Atlas.

Image uploads are stored in backend/images/.

You may configure Vite or Express for production deployment.
