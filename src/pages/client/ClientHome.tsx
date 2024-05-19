// src/pages/client/ClientHome.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import ClientCourses from '../../components/Courses/ClientCourse';

const ClientHome: React.FC = () => {
  const [adminProfile, setAdminProfile] = useState<{ name: string, description: string }>({ name: '', description: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const profileDocRef = doc(db, "profiles", "adminProfile");
      const docSnap = await getDoc(profileDocRef);
      if (docSnap.exists()) {
        setAdminProfile(docSnap.data() as { name: string, description: string });
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Welcome to Our Training Courses</h1>
      <h2>Trainer: {adminProfile.name}</h2>
      <p>{adminProfile.description}</p>
      <ClientCourses />
    </div>
  );
};

export default ClientHome;
