import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Add a CSS file for styles


const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Bike Sharing App</h1>
        <p>Fast, Reliable, and Affordable Rides</p>
      </header>
      <div className="navigation">
      
        <Link to="/ridehistory" className="nav-button">Ride-history</Link>
        <Link to="/map" className="nav-button">Book A Ride</Link>
        
        
      </div>
    </div>
  );
};

export default Home;