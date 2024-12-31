import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    userName: '',
    email: '',
    phone: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      alert('You need to login to access your profile.');
      navigate('/login');
    } else {
      axios.get(`http://localhost:3001/fetchUserData/${userId}`)
        .then((response) => {
          setProfileData({
            userName: response.data.userName,
            userEmail: response.data.userEmail,
            mobileNumber: response.data.mobileNumber,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          alert("Failed to load profile data.");
          setLoading(false);
        });
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    axios.put('http://localhost:3001/updateUserData', {
      ...profileData,
      _id: userId, // Include _id in the payload
    })
      .then(() => {
        alert("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    alert('You have been logged out.');
    navigate('/login');
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-item">
          <label>User Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="userName"
              value={profileData.userName}
              onChange={handleChange}
            />
          ) : (
            <span>{profileData.userName}</span>
          )}
        </div>
        <div className="profile-item">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profileData.userEmail}
              onChange={handleChange}
            />
          ) : (
            <span>{profileData.userEmail}</span>
          )}
        </div>
        <div className="profile-item">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={profileData.mobileNumber}
              onChange={handleChange}
            />
          ) : (
            <span>{profileData.mobileNumber}</span>
          )}
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
