import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { JobContext } from '../context/jobContext';

const MainPage = () => {
  const { userData, logout } = useContext(UserContext);
  const { jobs, isLoading, createJob } = useContext(JobContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    link: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    createJob(newJob);
    setNewJob({
      title: '',
      company: '',
      location: '',
      description: '',
      link: ''
    });
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <nav>
        <h1>Welcome, {userData ? userData.userName : "User"}!</h1>
        <button onClick={logout}>Logout</button>
      </nav>
      <main>
        <h2>Job Listings</h2>
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {filteredJobs.map((job) => (
              <li key={job._id}>
                <a href={job.link} target="_blank" rel="noopener noreferrer">
                  {job.title} - {job.company} ({job.location})
                </a>
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        )}

        <h3>Add a New Job</h3>
        <form onSubmit={handleJobSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={newJob.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={newJob.company}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newJob.location}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Job Description"
            value={newJob.description}
            onChange={handleInputChange}
          />
          <input
            type="url"
            name="link"
            placeholder="Application Link"
            value={newJob.link}
            onChange={handleInputChange}
          />
          <button type="submit">Add Job</button>
        </form>
      </main>
    </div>
  );
};

export default MainPage;
