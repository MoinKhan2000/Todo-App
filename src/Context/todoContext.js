import { createContext, useContext } from "react";
import { useUser } from "./userContext";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { token } = useUser()
  // const host = "http://localhost:5000";
  let host = "https://todo-app-backend-ls34.onrender.com";
  // Fetch all todos
  const fetchAllTodos = async () => {
    try {
      const response = await fetch(`${host}/api/todo`, {
        headers: { Authorization: token }
      });

      if (!response) {
        throw new Error("Could not fetch todos");
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Add a new todo
  const addTodo = async (todo) => {
    try {
      const response = await fetch(`${host}/api/todo/`, {
        method: "POST",
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      const json = await response.json();

      if (response.ok) {
        return { success: true, data: json };
      } else {
        return { success: false, message: json.message || 'Could not add todo' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${host}/api/todo/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
      });

      const json = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: json.message || 'Could not delete todo' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Toggle todo status
  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`${host}/api/todo/toggle/${id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        }
      });

      const json = await response.json();

      if (response.ok) {
        return { success: true, data: json };
      } else {
        return { success: false, message: json.message || 'Could not toggle todo status' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Update a todo
  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`${host}/api/todo/${id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const json = await response.json();

      if (response.ok) {
        return { success: true, data: json };
      } else {
        return { success: false, message: json.message || 'Could not update todo' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout function
  const logout = () => {
    // Clear the token from localStorage
    token = ""
    localStorage.removeItem('token');
  };

  return (
    <TodoContext.Provider value={{ fetchAllTodos, addTodo, deleteTodo, toggleTodo, updateTodo, logout }}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook to use the TodoContext
export const useTodo = () => {
  const TodoContextValue = useContext(TodoContext);
  if (!TodoContextValue) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return TodoContextValue;
};
