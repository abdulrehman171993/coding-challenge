import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        setUser(data[0]);
        return true;
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };

  const register = async (username, email, password, role) => {
    try {
      const existingResponse = await fetch(`http://localhost:3001/users?username=${username}`);
      const existingUsers = await existingResponse.json();

      if (existingUsers.length > 0) {
        throw new Error("Username already taken");
      }

      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!response.ok) {
        throw new Error("Failed to create an account");
      }

      const newUser = await response.json();
      setUser(newUser);
      return true;
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
