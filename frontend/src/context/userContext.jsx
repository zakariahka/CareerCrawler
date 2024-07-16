import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
  });

  const signup = async (userData) => {
    try {
      const response = await axiosInstance.post('/user/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/user/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setUserData(response.data.user);
        console.log('Login successful:', response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{ signup, login, isLoading, userData }}
    >
      {children}
    </UserContext.Provider>
  );
};
