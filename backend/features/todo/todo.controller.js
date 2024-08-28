import { ApplicationErrorHandler } from "../../errorHandler/applicationError.js";
import TodoRepository from "./todo.repository.js";

export default class TodoController {
  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async addTodo(req, res, next) {
    try {
      const { title, desc } = req.body;
      const userId = req.userId;
      const result = await this.todoRepository.addTodo(userId, title, desc);
      if (result) {
        return res.status(200).json(result);
      }
    } catch (error) {
      next(new ApplicationErrorHandler(error.message || "Failed to add todo", 500));
    }
  }

  async updateTodo(req, res, next) {
    try {
      const { userId } = req;
      const { todoId } = req.params;
      const { title, desc, status } = req.body;

      // Build updateData dynamically
      const updateData = { ...(title && { title }), ...(desc && { desc }), ...(status && { status }) };

      // Check if there are fields to update
      if (Object.keys(updateData).length === 0) {
        return next(new ApplicationErrorHandler('At least one field (title, desc, status) is required to update', 400));
      }

      const result = await this.todoRepository.updateTodo(userId, todoId, updateData);

      if (!result) {
        return next(new ApplicationErrorHandler("Todo not found", 404));
      }

      return res.status(200).json(result);
    } catch (error) {
      next(new ApplicationErrorHandler(error.message || "Failed to update todo", 500));
    }
  }

  async removeTodo(req, res, next) {
    try {
      const { todoId } = req.params;
      const userId = req.userId
      const result = await this.todoRepository.removeTodo(userId, todoId);
      if (result) {
        return res.status(200).json({ message: "Todo removed successfully" });
      }
      next(new ApplicationErrorHandler("Todo not found", 404));
    } catch (error) {
      next(new ApplicationErrorHandler(error.message || "Failed to remove todo", 500));
    }
  }

  async toggleTodo(req, res, next) {
    try {
      const { todoId } = req.params;
      const userId = req.userId
      const result = await this.todoRepository.toggleTodoStatus(userId, todoId)
      if (result) {
        return res.status(200).json(result);
      }
      next(new ApplicationErrorHandler("Todo not found", 404));
    } catch (error) {
      next(new ApplicationErrorHandler(error.message || "Failed to toggle todo status", 500));
    }
  }

  // Get a specific Todo by ID
  async getTodoById(req, res, next) {
    try {
      const { todoId } = req.params;
      const result = await this.todoRepository.getTodoById(todoId)
      if (result) {
        return res.status(200).json(result);
      }
      next(new ApplicationErrorHandler("Todo not found", 404));
    } catch (error) {
      next(new ApplicationErrorHandler(error.message || "Failed to get todo", 500));
    }
  }

  // Get all Todos for a user
  async getAllTodos(req, res, next) {
    try {
      const userId = req.userId;
      const result = await this.todoRepository.getAllTodos(userId);
      if (result) {
        return res.status(200).json(result);
      }
      next(new ApplicationErrorHandler("No todos found", 404));
    } catch (error) {
      next(new ApplicationErrorHandler(error.message || "Failed to get todos", 500));
    }
  }
}
