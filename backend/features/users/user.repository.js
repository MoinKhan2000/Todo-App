import UserModel from './user.model.js';
const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApplicationErrorHandler } from '../../errorHandler/applicationError.js';

export default class UserRepository {

  async signUp(name, email, hashedPassword) {
    try {
      // Check if a user with the same email already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new ApplicationErrorHandler('User with this email already exists', 409);
      }

      // Create instance of the UserModel
      const newUser = new UserModel({ name, email, password: hashedPassword });
      console.log("newuser -> ", newUser);

      // Save the new user to the database
      await newUser.save();

      return newUser;
    } catch (error) {

      // For other errors, throw a generic error
      throw new ApplicationErrorHandler(error?.message || 'Something went wrong during signup', error.code || 500);
    }
  }


  async signIn(email, password) {
    try {
      // Find the user by email
      const user = await UserModel.findOne({ email });

      // If the user is not found
      if (!user) throw new ApplicationErrorHandler('User not found', 404);

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new ApplicationErrorHandler('Password does not match', 400);

      // Generate a JWT token if the credentials are correct
      const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY);

      // Return the token and user 
      return { token, user };
    } catch (error) {
      throw new ApplicationErrorHandler(error.message, error.code);
    }
  }

  async logOut(id, token) {
    try {
      // Find the user by ID and remove the specific token from the tokens array
      const result = await UserModel.findByIdAndUpdate(id, {
        $pull: { tokens: { token } }
      }, { new: true });

      if (!result) {
        throw new ApplicationErrorHandler('User not found', 404);
      }

      return result;
    } catch (error) {
      throw new ApplicationErrorHandler('Could not logout', 500);
    }
  }

  async logOutFromAllDevices(id) {
    try {
      // Find the user by ID and set the tokens array to an empty array
      const result = await UserModel.findByIdAndUpdate(id, { $set: { tokens: [] } }, { new: true });

      if (!result) {
        throw new ApplicationErrorHandler('User not found', 404);
      }

      return result;
    } catch (error) {
      throw new ApplicationErrorHandler('Something went wrong during logout', 500);
    }
  }

  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return user;
      } else {
        throw new ApplicationErrorHandler('User not found', 404);
      }
    } catch (error) {
      throw new ApplicationErrorHandler('Something went wrong during findByEmail', 500);
    }
  }

  async changePassword(userId, newPassword) {
    try {
      const user = await UserModel.findById(userId);
      if (user) {
        user.password = newPassword;
        await user.save();
        return true;
      } else {
        throw new ApplicationErrorHandler('User not found', 404);
      }
    } catch (error) {
      throw new ApplicationErrorHandler('Something went wrong during changePassword', 500);
    }
  }

  async updateDetails(userId, newDetails) {
    try {
      const { password, ...updatedDetails } = newDetails;

      const user = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updatedDetails },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new ApplicationErrorHandler('User not found', 404);
      }

      // Exclude password from response
      user.password = undefined;

      return user;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new ApplicationErrorHandler(`Validation Error: ${error.message}`, 400);
      }
      throw new ApplicationErrorHandler('Could not update user details', 500);
    }
  }

  async findUserById(userId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new ApplicationErrorHandler('User not found', 404);
      }

      // Exclude sensitive fields
      user.password = undefined;
      user.tokens = undefined;

      return user;
    } catch (error) {
      throw new ApplicationErrorHandler('Could not find user', 500);
    }
  }

  async getAllUsers() {
    try {
      // Use projection to exclude fields like password and tokens
      const users = await UserModel.find({}, '-password -tokens');
      return users;
    } catch (error) {
      throw new ApplicationErrorHandler('Something went wrong', 500);
    }
  }
}
