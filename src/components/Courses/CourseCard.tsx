// src/components/CourseCard.tsx
import React from 'react';
import { Course } from '../Interface/interfaces';

interface CourseCardProps {
  course: Course;
  onDelete: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete }) => {
  return (
    <div>
      <h3>{course.title}</h3>
      <img src={course.imageUrl} alt={course.title} style={{ width: '100px', height: 'auto' }} />
      <p>{course.description}</p>
      <button onClick={() => onDelete(course.id)}>Delete</button>
    </div>
  );
};

export default CourseCard;
