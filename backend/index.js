import './config/env.js';
import express from 'express';
import { connectToDB } from './config/connectToDB.js';
import userRouter from './features/users/user.routes.js';
import todoRouter from './features/todo/todo.routes.js';
import { ApplicationErrorHandler } from './errorHandler/applicationError.js'; // Import the error handler

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL query parameters
app.use(express.query());

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// All the Routes
app.get('/sample', (req, res) => {
  res.send('Hello, Welcome to the ToDo App!');
});

// Main Routes.
app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  // Check if the error is an instance of ApplicationErrorHandler
  if (err instanceof ApplicationErrorHandler) {
    // Send a structured error response
    return res.status(err.code).json({
      success: false,
      message: err.message,
    });
  }

  // Handle any other unexpected errors
  return res.status(500).json({
    success: false,
    message: 'An unexpected error occurred!',
  });
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDB();
});
