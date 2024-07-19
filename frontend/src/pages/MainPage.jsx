import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { JobContext } from '../context/jobContext';

const MainPage = () => {
  const { userData, logout } = useContext(UserContext);
  const { jobs, isLoading } = useContext(JobContext);

  return (
    <div>
      <nav>
        <h1>Welcome, {userData ? userData.userName : "User"}!</h1>
        <button onClick={logout}>Logout</button>
      </nav>
      <main>
        <h2>Main Page</h2>
        <p>This is the main content area.</p>
        <div>
          <h3>Job Listings</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {jobs.map((job) => (
                <li key={job._id}>
                  {job.title} - {job.company}
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
