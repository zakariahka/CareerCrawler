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
    <div className="flex flex-col items-center min-h-screen bg-light-pink-orange">
      <nav className="w-full p-6 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold text-words-pink-orange">
            Welcome, {userData ? userData.userName : "User"}!
          </h1>
          <button 
            onClick={logout} 
            className="bg-pink-orange hover:bg-dark-pink-orange text-white font-bold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="w-full max-w-4xl p-6 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-words-pink-orange mb-4">Job Listings</h2>
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm w-full mb-4"
          />
          {isLoading ? (
            <p className="text-center text-words-pink-orange">Loading...</p>
          ) : (
            <ul className="space-y-4">
              {filteredJobs.map((job) => (
                <li key={job._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                  <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-pink-orange hover:text-dark-pink-orange">
                    {job.title} - {job.company} ({job.location})
                  </a>
                  <p className="mt-2 text-sm text-gray-700">{job.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-words-pink-orange mb-4">Add a New Job</h3>
          <form onSubmit={handleJobSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={newJob.title}
              onChange={handleInputChange}
              required
              className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm w-full"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={newJob.company}
              onChange={handleInputChange}
              required
              className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm w-full"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleInputChange}
              required
              className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm w-full"
            />
            <input
              type="text"
              name="description"
              placeholder="Job Description"
              value={newJob.description}
              onChange={handleInputChange}
              className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm w-full"
            />
            <input
              type="url"
              name="link"
              placeholder="Application Link"
              value={newJob.link}
              onChange={handleInputChange}
              className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm w-full"
            />
            <button 
              type="submit" 
              className="bg-pink-orange hover:bg-dark-pink-orange text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Add Job
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
