// src/pages/client/ClientHome.tsx
import React from 'react';
import ClientCourses from '../../components/Courses/ClientCourse';
import ClientShowAdminProfile from '../../components/Courses/ClientShowAdminProfile';

const ClientHome: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Our Training Courses</h1>
      <h2>Trainer:</h2>
        <ClientShowAdminProfile />
        <ClientCourses />
    </div>
  );
};

export default ClientHome;
