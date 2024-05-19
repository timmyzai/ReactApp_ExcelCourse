// src/db/profile.ts
import { AdminProfile } from '../../components/Interface/interfaces';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

// Firestore reference to the admin profile document
const adminProfileDocRef = doc(db, 'admin', 'profile');

// Fetch Admin Profile with Error Handling
export const getAdminProfile = async (): Promise<AdminProfile | null> => {
    try {
        const docSnap = await getDoc(adminProfileDocRef);
        if (docSnap.exists()) {
            return docSnap.data() as AdminProfile;
        } else {
            console.error("No admin profile found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching admin profile: ", error);
        return null;
    }
};

// Save Admin Profile with Error Handling
export const saveAdminProfile = async (profile: AdminProfile): Promise<void> => {
    try {
        await setDoc(adminProfileDocRef, profile);
    } catch (error) {
        console.error("Error saving admin profile: ", error);
    }
};
