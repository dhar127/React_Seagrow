import React from 'react';
import './WelcomePage.css';
import { NavLink } from "react-router-dom";
//import logo from './images/logo.jpg';

export const WelcomePage = () => {
  return (
    <div className="container" style={{ backgroundColor: '#FFFFFF' }}>
      {/*<div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>*/}
      <div className="welcome-container" style={{ backgroundColor: '#E6E6FA' }}>
        <h1 className="title">Welcome to Seagro</h1>
        <br />
        <br />
        <NavLink to="/signup">Sign-up</NavLink>
        <br />
        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
}

export default WelcomePage;
