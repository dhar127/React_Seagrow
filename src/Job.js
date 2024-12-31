import React, { useEffect } from 'react';

const Job = () => {
  useEffect(() => {
    // Redirect to the Django app's learning-center route
    window.location.href = 'http://127.0.0.1:8001';
  }, []);

  return (
    <div>
      <h1>Job Center</h1>
      <p>You are being redirected to the Job Center...</p>
    </div>
  );
};

export default Job;
