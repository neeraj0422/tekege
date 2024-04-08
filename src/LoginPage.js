import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://todo-api.aavaz.biz/login', {
        email: username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      localStorage.setItem('bearerToken', response.data.token);
      navigate('/lists');
    } catch (error) {
      if (error.response) {
        console.error('Error during login:', error.response.data);
        alert(`Login failed. Error: ${error.response.data.message}`);
      } else {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later or contact support.');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;