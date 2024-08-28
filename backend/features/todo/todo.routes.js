import express from 'express';
import TodoController from './todo.controller.js';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';

const todoRouter = express.Router();
const todoController = new TodoController();

// Add a new Todo  //? Done
todoRouter.post('/', jwtAuth, (req, res, next) => {
  todoController.addTodo(req, res, next);
});

// Update an existing Todo by ID  //? Done
todoRouter.put('/:todoId', jwtAuth, (req, res, next) => {
  todoController.updateTodo(req, res, next);
});

// Remove a Todo by ID //? Done
todoRouter.delete('/:todoId', jwtAuth, (req, res, next) => {
  todoController.removeTodo(req, res, next);
});

// Toggle the status of a Todo by ID (changed to PUT) //? Done
todoRouter.put('/toggle/:todoId', jwtAuth, (req, res, next) => {
  todoController.toggleTodo(req, res, next);
});

// Get a specific Todo by ID //? Done
todoRouter.get('/:todoId', jwtAuth, (req, res, next) => {
  todoController.getTodoById(req, res, next);
});

// Get all Todos for a user //? Done
todoRouter.get('/', jwtAuth, (req, res, next) => {
  todoController.getAllTodos(req, res, next);
});

export default todoRouter;
