import React, { useEffect } from 'react';

const Learning = () => {
  useEffect(() => {
    // Redirect to the Django app's learning-center route
    window.location.href = 'http://127.0.0.1:8000';
  }, []);

  return (
    <div>
      <h1>Learning Center</h1>
      <p>You are being redirected to the Learning Center...</p>
    </div>
  );
};

export default Learning;
