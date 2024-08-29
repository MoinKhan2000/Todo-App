import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const host = "http://localhost:5000";

  // Effect to sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Store token in state
  const storeTokenInLS = (authToken) => {
    setToken(authToken);
  };

  // Log out user
  const logOutUser = () => {
    setToken(null);
  };

  // SignUp function
  const signUp = async (formData) => {
    try {
      const url = `${host}/api/user/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      if (json.success) {
        return { success: true, data: json };
      } else {
        return { success: false, message: json.message || 'Failed to Sign Up. Please try again.' };
      }
    } catch (error) {
      return { success: false, message: error.message || 'An error occurred during sign-up.' };
    }
  };

  // SignIn function
  const signIn = async (formData) => {
    try {
      const url = `${host}/api/user/signin`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (json.token) {
        storeTokenInLS(json.token);
        return { success: true, data: json };
      } else {
        return { success: false, message: json.message || 'Failed to log in' };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred. Please try again later.' };
    }
  };

  return (
    <UserContext.Provider value={{ signIn, signUp, logOutUser, token }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const UserContextValue = useContext(UserContext);
  if (!UserContextValue) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return UserContextValue;
};
