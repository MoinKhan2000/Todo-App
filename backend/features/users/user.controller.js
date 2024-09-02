import bcrypt from "bcrypt";
import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository()
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.userRepository.signIn(email, password);
      res.status(200).json({ success: true, token, user });
    } catch (error) {
      next(error)
    }
  }

  async signUp(req, res, next) {
    try {
      let { name, email, password } = req.body;
      let hashedPassword = await bcrypt.hash(password, 12)
      let result = await this.userRepository.signUp(name, email, hashedPassword)
      if (result) {
        res.status(201).json({ success: true, result: result })
      } else {
        res.status(404).json({ success: false, message: 'User could not be created' })
      }
    } catch (error) {
      next(error)
    }
  }

}