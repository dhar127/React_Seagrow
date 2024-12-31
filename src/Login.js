import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import userImage from './images/user.jpg';
import passwordImage from './images/password.jpg';
//import logo from './images/logo.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRecovery = () => {
    alert('For password recovery, reach us at 📩 contactus@gmail.com');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.userPassword) {
      alert("Please fill in all fields.");
      return;
    }
    axios.post('http://localhost:3001/login', formData)
      .then((response) => {
        console.log(response);
        const { message, id } = response.data;
        if (message === "Success") {
          alert("Login Successful! Welcome back!");
          // Optional: Save user ID to localStorage/sessionStorage
          localStorage.setItem('userId', id);
          navigate('/home');
        } else if (message === "no record existed") {
          alert("User record not found. Please sign up.");
        } else if (message === "password is incorrect") {
          alert("Incorrect password. Please try again.");
        } else {
          alert("Unexpected response from the server. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during login: ", error);
        alert("An error occurred during login. Please try again later.");
      });
  };

  return (
    <div className='container'>
      {/*<div className='image-container'>
        <img src={logo} alt="Logo" />
      </div>*/}
      <div className='login-container'>
        <div className='form'>
          <div className='header'>
            <div className='text'><h3><b>LOGIN</b></h3></div>
            <p><b>Login to continue!</b></p>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className='inputs'>
              <div className='input'>
                <input
                  type="text"
                  name="userName"
                  placeholder="UserName"
                  value={formData.userName}
                  onChange={handleChange}
                  style={{
                    backgroundImage: `url(${userImage})`,
                    backgroundSize: '20px 20px',
                    backgroundPosition: 'left center',
                    backgroundRepeat: 'no-repeat',
                    paddingLeft: '30px',
                    height: '25px'
                  }}
                />
              </div>
              <br />
              <div className='input'>
                <input
                  type="password"
                  name="userPassword"
                  placeholder="Password"
                  value={formData.userPassword}
                  onChange={handleChange}
                  style={{
                    backgroundImage: `url(${passwordImage})`,
                    backgroundSize: '20px 20px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left center',
                    paddingLeft: '30px',
                    height: '25px'
                  }}
                />
              </div>
            </div>
            <br />
            <div className='forgotpassword'><b>Forgot Password? 🤔 <span onClick={handleRecovery} style={{ cursor: 'pointer', color: '#007bff' }}>Click Here!</span></b></div>
            <br />
            <div className='remember-me'>
              <label htmlFor="remember"><b>Remember me</b></label>
              <input type="checkbox" id="remember" />
            </div>
            <div className='submits'>
              <div className='submit'>
                <button type="submit"><b>Login</b></button>
              </div>
            </div>
          </form>
          <br />
          <div className='signup-text'>
            <p><b>Don't have an account?</b><br /><br /><Link to="/signup" className="signup-button"><b>Sign Up</b></Link></p>
          </div>
        </div>
        <br />
        <div>
          <Link to="/" className="signup-button" align="center">Back to home👈</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

