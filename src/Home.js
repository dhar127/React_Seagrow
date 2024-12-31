import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const navigateToPage = (feature) => {
    const confirmNavigation = window.confirm(`Do you want to navigate to the ${feature} page?`);
    if (confirmNavigation) {
      alert(`Navigating to ${feature}...`);
      navigate(`/${feature}`); // Use navigate function for routing
    }
  };

  const features = [
    { icon: 'fas fa-briefcase', name: 'Job Board', link: 'job-board' },
    { icon: 'fas fa-graduation-cap', name: 'Learning Center', link: 'learning-center' },
    { icon: 'fas fa-users', name: 'Community', link: 'community' },
    { icon: 'fas fa-bicycle', name: 'Bike Sharing', link: 'bike-sharing' },
    { icon: 'fas fa-newspaper', name: 'Daily Tech News', link: 'tech-news' },
    { icon: 'fas fa-comments', name: 'Chat', link: 'chat' },
    { icon: 'fas fa-images', name: 'Content Sharing', link: 'content-sharing' },
    { icon: 'fas fa-list', name: 'To-Do Lists', link: 'todo' },
  ];

  return (
    <div>
      <header className="header">
        <h1>Feature Hub</h1>
        <div className="profile-container">
          <Link to="/profile" className="profile-link"><b>Profile</b></Link>
          <i className="fas fa-user-circle"></i>
        </div>
      </header>

      <div className="nav-container">
        {features.map((item) => (
          <div
            key={item.name}
            className="nav-item"
            onClick={() => navigateToPage(item.link)}
          >
            <i className={`${item.icon} icon`}></i>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>&copy; 2024 Feature Hub. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

