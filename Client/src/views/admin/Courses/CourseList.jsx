
import React, { useState, useEffect } from 'react';
//import UnfinishedCoursesCard from "C:/Users/hadil/Desktop/admin/src/components/card/UnfinishedCoursesCard";
import axios from 'axios';
import CourseCard from 'C:/Users/hadil/Documents/GitHub/SummerInternship-Tabaani/Client/src/components/admincard/CourseCard.jsx';


const CourseList = () => {
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    // Fetch course data from your Node.js backend API
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
  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/course/${id}`);
      // Supprimer le cours du tableau des cours locaux
      setCoursesData((prevCourses) => prevCourses.filter((course) => course.id !== id));
      console.log('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };


 
  // Concaténez le nom du fichier avec l'URL de base pour obtenir l'URL complète de l'image
 // const imageUrl = baseUrl + imageFileName;

  return (
    <div className="mx-auto bg-white py-10  md:px-11 lg:px-24" id="about">
      <div className="flex items-center justify-between pb-8 pr-2">
        <p className="text-left text-2xl font-bold text-[#000000]">
          YOUR COURSES
        </p>
        <button className="rounded-lg bg-gray-200 py-2 px-6">See All</button>
      </div>
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {coursesData.map((course, id) => (
            <React.Fragment key={id}>
            <CourseCard
              id={course.id}
              title={course.title}
              price={course.price}
              image={course.image}
              level={course.level}
              userpic={course.userpic}
              instructor={course.instructor}
              chaptersnumber={course.chaptersnumber}
              description={course.description}
              onDelete={() => handleDeleteCourse(course.id)}
            />
            
          </React.Fragment>
            
          ))}
        </div>
      
    </div>
      
  );
  
  
};


export default CourseList;
