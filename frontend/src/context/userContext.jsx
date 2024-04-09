import React, { createContext, useState } from "react";
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const signup = async (userData) => {
    const url = "http://127.0.0.1:5000/signup";
    try {
        console.log('trying....')
      const response = await axios.post(url, userData);
      setUserData(response.data.UserData);
      setUserToken(response.data.UserData);
      console.log("Signup Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Signup Error:", error.response.data);
      return error.response.data;
    }
  };
  return <UserContext.Provider value ={{signup, userData, userToken}}>{children}</UserContext.Provider>
};
