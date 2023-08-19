import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';
import axios from 'axios';


export default function MyCourses() {
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCoursesData(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);
  return (

    <div className="container mx-auto py-4">
      <CourseList />
    </div>
  )
}
