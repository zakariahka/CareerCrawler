import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const signup = async (userData) => {
    const url = "http://127.0.0.1:5000/signup";
    try {
      const response = await axios.post(url, userData);
      return response
    } catch (error) {
      console.error("Signup Error:", error.response.data);
      return error.response.data;
    }
  };

  const login = async (email, password) => {
    const url = "http://127.0.0.1:5000/login";
    try {
        const response = await axios.post(url, {
            email: email,
            password: password
          });
        setUserData(response.data.user);
        setUserToken(response.data.token);
        console.log('login success:', response.data)
        return response
    }catch (error) {
        console.error("login Error:", error.response.data);
        return error.response.data;
      }
  }

  useEffect(() =>{
    setIsLoggedIn(!!userToken);
  },[userToken])

  return (
    <UserContext.Provider value={{ signup, login, isLoggedIn, userData, userToken }}>
      {children}
    </UserContext.Provider>
  );
};
