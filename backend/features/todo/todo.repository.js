import { ApplicationErrorHandler } from "../../errorHandler/applicationError.js";
import TodoModel from "./todo.model.js";

export default class TodoRepository {

  // Add a new Todo
  async addTodo(userId, title, desc) {
    try {
      const newTodo = new TodoModel({ user: userId, title, desc, status: "pending" });
      return await newTodo.save();
    } catch (error) {
      throw new ApplicationErrorHandler(error.message || "Failed to add todo", 500);
    }
  }

  // Remove a Todo by ID
  async removeTodo(userId, todoId) {
    try {
      const result = await TodoModel.findOneAndDelete({ _id: todoId, user: userId });
      if (!result) {
        throw new ApplicationErrorHandler("Todo not found", 404);
      }
      return result;
    } catch (error) {
      throw new ApplicationErrorHandler(error.message || "Failed to remove todo", 500);
    }
  }

  // Update a Todo by ID
  async updateTodo(userId, todoId, updateData) {
    try {
      console.log('todoRepository.update', userId, todoId, updateData);

      const result = await TodoModel.findOneAndUpdate(
        { _id: todoId, user: userId },
        updateData,
        { new: true } // Return the updated document
      );
      if (!result) {
        throw new ApplicationErrorHandler("Todo not found", 404);
      }
      return result;
    } catch (error) {
      throw new ApplicationErrorHandler(error.message || "Failed to update todo", 500);
    }
  }

  // Toggle Todo Status (Complete/Pending)
  async toggleTodoStatus(userId, todoId) {
    try {
      const todo = await TodoModel.findOne({ _id: todoId, user: userId });
      if (!todo) {
        throw new ApplicationErrorHandler("Todo not found", 404);
      }

      // Toggle the status between 'complete' and 'pending'
      todo.status = todo.status === 'pending' ? 'complete' : 'pending';
      return await todo.save();
    } catch (error) {
      throw new ApplicationErrorHandler(error.message || "Failed to toggle todo status", 500);
    }
  }

  // Find a Todo by ID
  async getTodoById(todoId) {
    try {

      const todo = await TodoModel.findById(todoId);
      if (!todo) {
        // throw new ApplicationErrorHandler("Todo not found", 404);
        throw new ApplicationErrorHandler("Todo not found", 404);
      }
      return todo;
    } catch (error) {
      throw new ApplicationErrorHandler(error.message || "Failed to retrieve todo", 500);
    }
  }

  // Get all Todos for a user
  async getAllTodos(userId) {
    try {
      const todos = await TodoModel.find({ user: userId });
      if (!todos || todos.length === 0) {
        throw new ApplicationErrorHandler("No todos found", 404);
      }
      return todos;
    } catch (error) {
      throw new ApplicationErrorHandler(error.message || "Failed to retrieve todos", 500);
    }
  }
}
