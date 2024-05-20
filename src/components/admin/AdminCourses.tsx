// src/components/admin/AdminCourses.tsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase/firebase';
import CourseCard from './CourseCard';
import { Course } from '../Interface/interfaces';
import '../../assets/styles/AdminCourses.css';

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const coursesCollectionRef = collection(db, "courses");

  const fetchCourses = async () => {
    const data = await getDocs(coursesCollectionRef);
    setCourses(data.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Course[]);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !description || !image) return;

    const storage = getStorage();
    const imageRef = ref(storage, `courseImages/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(coursesCollectionRef, { title, description, imageUrl });
    setTitle('');
    setDescription('');
    setImage(null);
    fetchCourses();
  };

  const handleDeleteCourse = async (id: string) => {
    const docRef = doc(db, "courses", id);
    await deleteDoc(docRef);
    fetchCourses();
  };

  return (
    <div>
      <form onSubmit={handleAddCourse} className="course-form">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Course Title"
          required
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Course Description"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
          required
        />
        <button type="submit">Add Course</button>
      </form>
      <div className="courses-container">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onDelete={handleDeleteCourse} />
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
