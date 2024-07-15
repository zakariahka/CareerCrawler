import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [userData, setUserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (userData) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/signup', userData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
    }
  };
  
  const login = async (email, password) => {
    const url = 'http://127.0.0.1:5000/user/login';
    try {
      const response = await axios.post(url, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (response.status === 200 && response.data.token) {
        setUserData(response.data.user);
        setUserToken(response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        localStorage.setItem('userToken', response.data.token);
        console.log('login success:', response.data);
        return response.data;
      }
    } catch (error) {
      console.error('login Error:', error.response.data);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{ signup, login, isLoading, userData, userToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
