// src/pages/admin/AdminHome.tsx
import React from 'react';
import Courses from '../../components/Courses/AdminCourses';
import AdminProfileComponent from '../../components/Courses/AdminProfile';

const AdminHome: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminProfileComponent />
      <Courses />
    </div>
  );
};

export default AdminHome;
