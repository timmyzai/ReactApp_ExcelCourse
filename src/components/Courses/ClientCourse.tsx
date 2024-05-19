// src/components/ClientCourses.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Course } from '../Interface/interfaces';

const ClientCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const coursesCollectionRef = collection(db, "courses");

  const fetchCourses = async () => {
    const data = await getDocs(coursesCollectionRef);
    setCourses(data.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Course[]);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      {courses.map(course => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <img src={course.imageUrl} alt={course.title} style={{ width: '100px', height: 'auto' }} />
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientCourses;
