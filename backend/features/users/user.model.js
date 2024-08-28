import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot be more than 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Password must be at least 8 characters long"],
  },
},
  {
    timestamps: true,
  });


const UserModel = mongoose.model("User", userSchema);
export default UserModel;
