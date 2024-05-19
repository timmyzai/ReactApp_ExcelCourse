// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import AdminHome from './pages/admin/AdminHome';
import Login from './pages/admin/Login';
import Profile from './pages/admin/Profile';
import ClientHome from './pages/client/ClientHome';
import './App.css';

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
