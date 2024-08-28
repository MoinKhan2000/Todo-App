import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  },
  desc: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [500, "Description cannot be more than 500 characters"]
  },
  status: {
    type: String,
    enum: ['complete', 'pending'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const TodoModel = mongoose.model('Todo', todoSchema);
export default TodoModel;
