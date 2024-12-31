import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

import userImage from './images/user.jpg';
import passwordImage from './images/password.jpg';
//import logo from './images/logo.jpg';
import emailImage from './images/email.jpg';
import nameImage from './images/name.jpg';
import mobileImage from './images/mobile.jpg';
import addressImage from './images/address.jpg';

import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    userPassword: '',
    confirmPassword: '',
    userEmail: '',
    mobileNumber: '',
    userAddress: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation checks
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.userPassword)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long.");
      return;
    }

    if (formData.userPassword !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    axios.post('http://localhost:3001/signup', { 
      ...formData
    })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      {/*<div className='image-container'>
        <img src={logo} alt="Logo" />
      </div>*/}
      <div className='content-container'>
        <div className='form'>
          <div className='header'>
            <div className='text'><h3><b>SIGNUP</b></h3></div>
            <p><b>Create your own account!!</b></p>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className='inputs'>
              {[
                { name: 'fullName', placeholder: 'Name', img: nameImage },
                { name: 'userName', placeholder: 'UserName', img: userImage },
                { name: 'mobileNumber', placeholder: 'Mobile Number', img: mobileImage },
                { name: 'userEmail', placeholder: 'Email', img: emailImage },
                { name: 'userAddress', placeholder: 'Address', img: addressImage },
                { name: 'userPassword', placeholder: 'Password', img: passwordImage, type: 'password' },
                { name: 'confirmPassword', placeholder: 'Confirm Password', img: passwordImage, type: 'password' },
              ].map(({ name, placeholder, img, type = 'text' }) => (
                <div key={name} className='input'>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: '20px 20px',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'left center',
                      paddingLeft: '30px',
                      height: '25px'
                    }}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <br />
            <div className='submits'>
              <div className='submit'>
                <button type="submit" className="signup-button"><b>SignUp</b></button>
              </div>
            </div>
          </form>
          <br />
          <div className='login-text'>
            <h3><b>Already have an account?</b> <Link to="/login" className="login-button"><b>Login</b></Link></h3>
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

export default Signup;

