import React, { useEffect } from 'react';

const Community = () => {
  useEffect(() => {
    // Redirect to the Django app's learning-center route
    window.location.href = 'http://127.0.0.1:8004';
  }, []);

  return (
    <div>
      <h1>Community</h1>
      <p>You are being redirected to the Community...</p>
    </div>
  );
};

export default Community;
