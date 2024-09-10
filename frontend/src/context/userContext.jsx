import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";  // Import js-cookie to handle cookies

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Check if there's existing user data in cookies (instead of localStorage)
    const storedUser = Cookies.get("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const API_URL = process.env.REACT_APP_API_URL;

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Ensure cookies are sent with requests
  });

  // Interceptor to automatically add the token to request headers if it's available in cookies
  axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("authToken");  // Get the token from cookies
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;  // Attach token to headers
    }
    return config;
  });

  const signup = async (userData) => {
    try {
      const response = await axiosInstance.post("/user/signup", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post(
        "/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 && response.data) {
        setUserData(response.data.user); // Store the user data in state
        Cookies.set("userData", JSON.stringify(response.data.user), { expires: 7 }); // Set user data in cookie (valid for 7 days)
        Cookies.set("authToken", response.data.token, { expires: 7 });  // Store the token in a cookie
        return response.data;
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = () => {
    setUserData(null); // Clear user data from state
    Cookies.remove("userData"); // Remove user data from cookies
    Cookies.remove("authToken"); // Remove token from cookies
    // Optionally: Make an API call to invalidate the session on the server
  };

  const verifyUser = async () => {
    console.log("verify called");
    try {
      const response = await axiosInstance.get("/user/verify");
      if (response.status === 200 && response.data.user) {
        // Token is valid, set user data
        setUserData(response.data.user);
        Cookies.set("userData", JSON.stringify(response.data.user), { expires: 7 }); // Persist user data in cookies
      } else {
        // Handle other response statuses (non-200) more gracefully
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error) {
      // Check if the error is authentication-related
      if (error.response && error.response.status === 401) {
        // Unauthorized, log the user out
        logout();
        console.log("Unauthorized, logging out...");
      } else {
        console.error("Verification Error:", error.response ? error.response.data : error.message);
      }
    }
  };

  useEffect(() => {
    // On page load, verify the user using token from cookies
    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ signup, login, userData, logout }}>
      {children}
    </UserContext.Provider>
  );
};
