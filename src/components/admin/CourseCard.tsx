// src/components/admin/CourseCard.tsx
import React from 'react';
import { Course } from '../Interface/interfaces';
import '../../assets/styles/CourseCard.css';

interface CourseCardProps {
  course: Course;
  onDelete: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete }) => {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <img src={course.imageUrl} alt={course.title} />
      <p>{course.description}</p>
      <button onClick={() => onDelete(course.id)}>Delete</button>
    </div>
  );
};

export default CourseCard;
