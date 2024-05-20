// src/components/client/ClientHome.tsx
import React from 'react';
import ClientShowAdminProfile from './ClientShowAdminProfile';

import '../../assets/styles/ClientHome.css';
import ClientCourses from './ClientCourse';

const ClientHome: React.FC = () => {
  return (
    <div className="container">
      <header>
        <h1>Welcome to Our Training Courses</h1>
      </header>
      <main>
        <section className="trainer-profile">
          <h2>Trainer Profile</h2>
          <ClientShowAdminProfile />
        </section>
        <section className="courses">
          <h2>Available Courses</h2>
          <ClientCourses />
        </section>
      </main>
      <footer>
        <p>Contact us at contact@trainingcourses.com</p>
      </footer>
    </div>
  );
};

export default ClientHome;
