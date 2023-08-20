import { useEffect, useState } from "react";

const useFetchCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "courses");
        setCourses(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return courses;
};
//sss
export default useFetchCourses;
