import React from "react";
import { useEffect, useState } from "react";
import UnfinishedCoursesCard from "components/card/UnfinishedCoursesCard";
import CourseCard from "components/card/CourseCard";
import { useParams } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const { id } = useParams();

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

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/user/6Mf70xX01X6kfypHDVCC/subscribed-courses`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "setSubscribedCourses");
        setSubscribedCourses(data.courses);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-2 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="mb-4 mt-5 flex flex-col justify-between md:flex-row md:items-center">
          <h4 className="text-2xl font-bold dark:text-white">
            Your unfinished courses
          </h4>
        </div>
        <div className="z-20">
          {/* Unfinished courses slider */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2">
            {subscribedCourses.map((subscribed, id) => (
              <div className="pr-2">
                <UnfinishedCoursesCard
                  key={id}
                  id={subscribed.id}
                  title={subscribed.title}
                  image={subscribed.thumbnail}
                  difficulty={subscribed.difficulty}
                  instructor={subscribed.instructor}
                  students={subscribed.students}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 mt-5 flex flex-col justify-between md:flex-row md:items-center">
          <h4 className="text-2xl font-bold  dark:text-white">
            Your Next courses
          </h4>
        </div>

        {/* Next courses grid */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {courses.map((course, id) => (
            <CourseCard
              key={id}
              id={course.id}
              title={course.title}
              author={course.author}
              price={course.price}
              thumbnail={course.thumbnail}
              difficulty={course.difficulty}
              students={course.students}
              chapters={course.chapters.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
