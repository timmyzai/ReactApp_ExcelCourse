import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, DocumentData } from "firebase/firestore";

const courseCollectionRef = collection(db, "courses");

// Fetching Courses with Error Handling
export const getCourses = async (): Promise<Course[]> => {
    try {
        const querySnapshot = await getDocs(courseCollectionRef);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Course[];
    } catch (error) {
        console.error("Error fetching courses: ", error);
        return [];
    }
};

// Adding a Course with Error Handling
export const addCourse = async (name: string, description: string, imageUrl: string): Promise<void> => {
    try {
        await addDoc(courseCollectionRef, { name, description, imageUrl });
    } catch (error) {
        console.error("Error adding course: ", error);
    }
};

// Updating a Course with Error Handling
export const updateCourse = async (id: string, updatedData: CourseUpdate): Promise<void> => {
    try {
        const courseDocRef = doc(db, "courses", id);
        await updateDoc(courseDocRef, updatedData as DocumentData);
    } catch (error) {
        console.error("Error updating course: ", error);
    }
};

// Deleting a Course with Error Handling
export const deleteCourse = async (id: string): Promise<void> => {
    try {
        const courseDocRef = doc(db, "courses", id);
        await deleteDoc(courseDocRef);
    } catch (error) {
        console.error("Error deleting course: ", error);
    }
};


// Define an interface for what constitutes a course
interface Course {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
}

// Define an interface for the updates you might perform on a course
interface CourseUpdate {
    name?: string;
    description?: string;
    imageUrl?: string;
}
