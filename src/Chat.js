import React, { useEffect } from 'react';

const Chat = () => {
  useEffect(() => {
    // Redirect to the Django app's learning-center route
    window.location.href = 'http://127.0.0.1:8003';
  }, []);

  return (
    <div>
      <h1>Chat</h1>
      <p>You are being redirected to the Chat...</p>
    </div>
  );
};

export default Chat;
