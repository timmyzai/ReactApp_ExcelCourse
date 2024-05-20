// src/components/admin/AdminHome.tsx
import React from 'react';
import AdminProfileComponent from './AdminProfile';
import AdminCourses from './AdminCourses';
import '../../assets/styles/AdminHome.css';

const AdminHome: React.FC = () => {
  return (
    <div className="container">
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>
        <section className="edit-profile">
          <h2>Edit Profile</h2>
          <AdminProfileComponent />
        </section>
        <section className="manage-courses">
          <h2>Manage Courses</h2>
          <AdminCourses />
        </section>
      </main>
    </div>
  );
};

export default AdminHome;
