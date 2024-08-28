import express from 'express';
import { body, validationResult } from 'express-validator';
import UserController from './user.controller.js';
import { ApplicationErrorHandler } from '../../errorHandler/applicationError.js';

const userRouter = express.Router();
let userController = new UserController();

// Validation rules for signup
const signupValidationRules = [
  body('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters long'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 8 characters long')
];

// Validation rules for signin
const signinValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Map over errors array and extract the msg field
    const errorMessages = errors.array().map(error => error.msg);

    // Pass the error messages to ApplicationErrorHandler
    return next(new ApplicationErrorHandler(errorMessages.join(', '), 400)); // 400 Bad Request
  }
  next();
};

// Sign-up route with validation middleware
userRouter.post('/signup', signupValidationRules, validate, (req, res, next) => {
  userController.signUp(req, res, next);
});

// Sign-in route with validation middleware
userRouter.post('/signin', signinValidationRules, validate, (req, res, next) => {
  userController.signIn(req, res, next);
});

export default userRouter;
