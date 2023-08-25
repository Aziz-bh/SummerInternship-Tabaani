import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
//----------------------------hooks----------------------//
import useSubscribedCourses from "../../../hooks/userHook";
import useFetchCourses from "../../../hooks/courseHook";
//----------------------------cards----------------------//
import UnfinishedCoursesCard from "components/card/UnfinishedCoursesCard";
import CourseCard from "components/card/CourseCard";

const Courses = () => {
  const subscribedCourses = useSubscribedCourses();
  console.log("subscribedCourses", subscribedCourses);
  const AllCourses = useFetchCourses();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(subscribedCourses.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleCourses = subscribedCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-2 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="mx-auto py-10">
          <div className="flex items-center justify-between pb-8 pr-2">
            <p className="text-left text-2xl font-bold text-[#000000]">
              YOUR COURSES
            </p>
            <div className="flex items-center">
              {currentPage > 1 && (
                <button
                  className="rounded-full bg-gray-200 px-6 py-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <FaChevronLeft />
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  className="rounded-full bg-gray-200 px-6 py-2"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <FaChevronRight />
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
            {visibleCourses.map((subscribed, index) => (
              <div key={index} className="pr-2">
                {console.log("subscribed:", subscribed)}{" "}
                <UnfinishedCoursesCard
                  id={subscribed?.id}
                  title={subscribed?.title}
                  image={subscribed?.image}
                  difficulty={subscribed?.level}
                  instructor={subscribed?.instructor.fullName}
                  userpic={subscribed?.instructor.userpic}
                  progress={subscribed?.progress}
                  lessons={subscribed.chapters.map(
                    (chapter) => chapter?.lessons?.length
                  )}
                  chapters={subscribed?.chapters?.length}
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
