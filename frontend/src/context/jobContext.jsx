import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
  });

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get('/job/jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        },
        params: {
          location: location 
        }
      });
      setJobs(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [location]);

  return (
    <JobContext.Provider value={{ jobs, isLoading, setLocation }}>
      {children}
    </JobContext.Provider>
  );
};
