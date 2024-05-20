// src/components/client/ClientShowAdminProfile.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { AdminProfile } from '../Interface/interfaces';
import '../../assets/styles/ClientShowAdminProfile.css';

const ClientShowAdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const adminProfileCollectionRef = collection(db, 'admin');

  const fetchProfile = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(adminProfileCollectionRef);
    const profileData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as AdminProfile));
    setProfile(profileData);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="profiles">
          {profile.map((admin) => (
            <div key={admin.id} className="profile-card">
              <img src={admin.profilePictureUrl} alt={`${admin.name}'s profile`} className="profile-picture" />
              <div className="profile-details">
                <h2>{admin.name}</h2>
                <p>{admin.background}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientShowAdminProfile;
