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
        <div className="mx-auto  py-10 ">
          <div className="flex items-center justify-between pb-8 pr-2">
            <p className="text-left text-2xl font-bold text-[#000000]">
              YOUR COURSES
            </p>
            <button className="rounded-lg bg-gray-200 px-6 py-2">
              See All
            </button>
          </div>
          <div className="grid grid-cols-1  gap-4 sm:grid-cols-1 md:grid-cols-2 ">
            {/* Unfinished courses slider */}
            {subscribedCourses?.map((subscribed, index) => (
              <div key={index} className="pr-2">
                <UnfinishedCoursesCard
                  id={subscribed.id}
                  title={subscribed.title}
                  image={subscribed.image}
                  difficulty={subscribed.level}
                  instructor={subscribed.instructor}
                  userpic={subscribed.userpic}
                  progress={subscribed.progress}
                  chaptersnumber={subscribed.chaptersnumber}
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
