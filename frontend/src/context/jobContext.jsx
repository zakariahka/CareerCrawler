import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const { userData } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      if (!userData) return;

      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/job/jobs', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`,
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [userData]);

  const createJob = async (jobData) => {
    if (!userData) return;

    try {
      const response = await axiosInstance.post('/job/jobs', jobData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`,
        },
      });
      setJobs([...jobs, response.data]);
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  return (
    <JobContext.Provider value={{ jobs, isLoading, createJob }}>
      {children}
    </JobContext.Provider>
  );
};
