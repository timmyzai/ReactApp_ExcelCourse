// src/pages/admin/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  // Ensure correct path

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // Use login method from the auth context

  // Hardcoded credentials
  const hardcodedUsername = "test";
  const hardcodedPassword = "test";

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username === hardcodedUsername && password === hardcodedPassword) {
      login();  // Update the auth state to logged in
      navigate('/admin/home');
    } else {
      console.error("Authentication error: Invalid credentials");
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
