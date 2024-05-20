// src/pages/admin/Profile.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const profileDocRef = doc(db, "profiles", "adminProfile");

  useEffect(() => {
    const fetchProfile = async () => {
      const docSnap = await getDoc(profileDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setDescription(data.description);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateDoc(profileDocRef, { name, description });
    alert('Profile updated!');
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
