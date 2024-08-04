import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken") || null);
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
      if (response.status === 200 && response.data) {
        setUserData(response.data.user);
        setUserToken(response.data.token);
        console.log(response.data.user)
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        localStorage.setItem("userToken", response.data.token);
        return response.data;
      }
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ signup, login, isLoading, userData, userToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
