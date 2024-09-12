import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { JobContext } from '../context/jobContext';

const MainPage = () => {
  const { userData, logout } = useContext(UserContext);
  const { jobs, isLoading, setLocation } = useContext(JobContext);  
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInput, setLocationInput] = useState(''); 
  
  const handleLocationSearch = () => {
    setLocation(locationInput);
  };

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
          <input
            type="text"
            placeholder="Search by location..."
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm w-full mb-4"
          />
          <button
            onClick={handleLocationSearch}
            className="bg-pink-orange hover:bg-dark-pink-orange text-white font-bold py-2 px-4 rounded-lg"
          >
            Enter
          </button>
          {isLoading ? (
            <p className="text-center text-words-pink-orange">Loading...</p>
          ) : (
            <ul className="space-y-4">
              {jobs.map((job) => (
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
      </main>
    </div>
  );
};

export default MainPage;
