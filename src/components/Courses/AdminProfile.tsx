// src/components/AdminProfile.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/firebase';
import { AdminProfile } from '../Interface/interfaces';

const AdminProfileComponent: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile>({
    name: '',
    background: '',
    profilePictureUrl: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const adminProfileDocRef = doc(db, 'admin', 'profile'); // Assuming there's a single admin profile doc

  const fetchProfile = async () => {
    const docSnap = await getDoc(adminProfileDocRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data() as AdminProfile);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfilePictureUpload = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `profilePictures/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  };

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      let profilePictureUrl = profile.profilePictureUrl;
      if (profilePicture) {
        profilePictureUrl = await handleProfilePictureUpload(profilePicture);
      }
      const updatedProfile = { ...profile, profilePictureUrl };
      await setDoc(adminProfileDocRef, updatedProfile);
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error saving profile: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Admin Profile</h2>
      <form onSubmit={handleSaveProfile}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Background:
            <textarea
              value={profile.background}
              onChange={(e) => setProfile({ ...profile, background: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Profile Picture:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
            />
          </label>
          {profile.profilePictureUrl && (
            <div>
              <img src={profile.profilePictureUrl} alt="Profile" style={{ width: '100px', height: 'auto' }} />
            </div>
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      {/* Display the saved profile */}
      <div>
        <h3>Saved Profile</h3>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Background:</strong> {profile.background}</p>
        {profile.profilePictureUrl && (
          <img src={profile.profilePictureUrl} alt="Profile" style={{ width: '100px', height: 'auto' }} />
        )}
      </div>
    </div>
  );
};

export default AdminProfileComponent;
