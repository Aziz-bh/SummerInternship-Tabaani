import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

import useFetchCourses from "../../../hooks/courseHook";
import CourseCard from "components/card/CourseCard";

const NewCourses = () => {
  const [currPage, setCurrPage] = useState(0);
  const AllCourses = useFetchCourses();

  const itemsPerPage = 8;
  const totalPages = Math.ceil(AllCourses.length / itemsPerPage);

  return (
    <div className="mx-auto bg-white py-10  md:px-11 lg:px-24" id="about">
      <div className="flex items-end justify-between pb-8">
        <p className="text-left text-2xl font-bold text-[#000000]">
          NEW COURSES
        </p>
        <div className="mt-4 flex justify-center">
          <button className="mx-2 rounded-md bg-gray-200 px-2 py-2 text-[#000000]">
            <FiFilter size={24} color="silver" />
          </button>
        </div>
      </div>

      <div className="grid gap-8 px-12 pb-16 sm:grid-cols-2 sm:px-0 md:grid-cols-2 lg:grid-cols-4">
        {AllCourses.slice(
          currPage * itemsPerPage,
          (currPage + 1) * itemsPerPage
        ).map((course, id) => (
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
      <div className="mt-4 flex justify-center overflow-x-auto">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            onClick={() => setCurrPage(i)}
            className={`${
              i === currPage ? "bg-gray-800" : "bg-gray-300 hover:bg-gray-400"
            } mx-2 h-3 w-3 cursor-pointer rounded-full`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCourses;
