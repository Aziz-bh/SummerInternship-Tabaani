import React from "react";
import useSubscribedCourses from "../../../hooks/userHook";
import useFetchCourses from "../../../hooks/courseHook";
import UnfinishedCoursesCard from "components/card/UnfinishedCoursesCard";
import CourseCard from "components/card/CourseCard";
//the user dashboard

const Courses = () => {
  const subscribedCourses = useSubscribedCourses();
  const AllCourses = useFetchCourses();

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-2 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="mb-4 mt-5 flex flex-col justify-between md:flex-row md:items-center">
          <h4 className="text-2xl font-bold dark:text-white">
            Your unfinished courses
          </h4>
        </div>
        <div className="z-20">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2">
            {subscribedCourses?.map((subscribed, id) => (
              <div className="pr-2" key={id}>
                <UnfinishedCoursesCard
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
          <h4 className="text-2xl font-bold dark:text-white">
            Your Next courses
          </h4>
        </div>
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {AllCourses.map((course, id) => (
            <CourseCard
              key={id}
              id={course.id}
              title={course.title}
              instructor={course.instructor}
              price={course.price}
              image={course.image}
              level={course.level}
              chapters={course.chapters.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
