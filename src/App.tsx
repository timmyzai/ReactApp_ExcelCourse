// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import ClientHome from './components/client/ClientHome';
import AdminHome from './components/admin/AdminHome';
import Profile from './components/admin/Profile';
import Login from './components/admin/Login';
import './assets/styles/App.css';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ClientHome />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/admin/home" replace /> : <Navigate to="/admin/login" replace />} />
      <Route path="login" element={isAuthenticated ? <Navigate to="/admin/home" replace /> : <Login />} />
      <Route path="home" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/admin/home" replace />} />
    </Routes>
  );
};

export default App;
