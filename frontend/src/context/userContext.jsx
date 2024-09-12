import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [token, setToken] = useState(Cookies.get("access_token_cookie")); // Correct cookie name
  const API_URL = process.env.REACT_APP_API_URL;
  
  const axiosInstance = axios.create({
    baseURL: API_URL
  });

  const login = async (email, password) => {
    console.log("login is called");
    try {
      const response = await axiosInstance.post("/user/login", { email, password });
      if (response.status === 200 && response.data) {
        setUserData(response.data.user);
        setAuthInitialized(true);
        console.log("cookieeee", Cookies.get()); // Check all cookies
        return response.data;
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const checkCookie = () => {
    console.log("check cookie is called");
    const newToken = Cookies.get(); // Correct cookie name
    console.log("new token", newToken);
    if (newToken && newToken !== token) {
      setToken(newToken); // Update token state if it changes
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkCookie();
    }, 5000); // Check cookies every 5 seconds
    
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [token]); // This dependency ensures it updates when the token changes

  return (
    <UserContext.Provider value={{ login, userData }}>
      {children}
    </UserContext.Provider>
  );
};
