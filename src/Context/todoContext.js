import { createContext, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const host = "http://localhost:5000";

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

  return (
    <TodoContext.Provider value={{ fetchAllTodos, addTodo, deleteTodo, toggleTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => {
  const TodoContextValue = useContext(TodoContext);
  if (!TodoContextValue) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return TodoContextValue;
}
