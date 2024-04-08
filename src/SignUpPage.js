import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post('http://todo-api.aavaz.biz/signup', {
        email: username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      // Redirect the user to the login page
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Error during sign-up:', error.response.data);
        alert('An account with this email already exists. Please try logging in instead.');
      } else if (error.response) {
        console.error('Error during sign-up:', error.response.data);
        alert(`Sign-up failed. Error: ${error.response.data.message}`);
      } else {
        console.error('Error during sign-up:', error);
        alert('An error occurred during sign-up. Please try again later or contact support.');
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpPage;