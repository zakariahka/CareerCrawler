import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        }
      });
      setJobs(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
      setIsLoading(false);
    }
  };

  const createJob = async (newJob) => {
    try {
      const response = await axiosInstance.post('/job/jobs', newJob, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setJobs([...jobs, response.data]);
    } catch (error) {
      console.error("Failed to create job", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, isLoading, createJob }}>
      {children}
    </JobContext.Provider>
  );
};
