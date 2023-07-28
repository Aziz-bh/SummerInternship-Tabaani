import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import ScoreIcon from "assets/icons/ScoreIcon.png";
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

const Guests = [
  {
    id: 1,
    title: "create an interface",
    author: "Netflix",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 2,
    title: "create a video",
    author: "Tesla",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 3,
    title: "Make a logo design",
    author: "Tik tok",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 4,
    title: "Make a logo design",
    author: "Tik tok",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 5,
    title: "Make a logo design",
    author: "Tik tok",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 6,
    title: "Make a logo design",
    author: "Tik tok",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 7,
    title: "Make a logo design",
    author: "Tik tok",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 8,
    title: "Make a logo design",
    author: "Tik tok",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 9,
    title: "Make a logo design",
    author: "Tik tok",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
  {
    id: 10,
    title: "Make a logo design",
    author: "Tik tok",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
  },
];

const TopCourses = () => {
  const [currPage, setCurrPage] = useState(0);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(Guests.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div
      className="mx-auto bg-white py-10 text-white md:px-11 lg:px-24"
      id="about"
    >
      <div className="flex items-center justify-between pb-8">
        <p className="text-left text-2xl font-bold text-[#000000]">
          TOP COURSES
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handlePrevPage}
            className="mx-2 rounded-md bg-gray-300 px-2 py-2 text-[#000000]"
            disabled={currPage === 0}
          >
            <MdKeyboardArrowLeft size={20} />
          </button>
          <button
            onClick={handleNextPage}
            className="mx-2 rounded-md bg-gray-300  px-2 py-2 text-[#000000]"
            disabled={currPage === totalPages - 1}
          >
            <MdOutlineKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid gap-8 px-12 pb-16 sm:grid-cols-2 sm:px-0 md:grid-cols-2 lg:grid-cols-4">
        {Guests.slice(
          currPage * itemsPerPage,
          (currPage + 1) * itemsPerPage
        ).map(({ id, title, image }) => (
          <div className="h-full w-full" key={id}>
            <div className="relative w-full">
              <img
                src={image}
                className="mb-3 h-52 w-full rounded-xl object-cover 3xl:h-full 3xl:w-full"
                alt=""
              />
            </div>

            <div className="p-![18px] mb-6 flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
              <div>
                <p className="text-lg font-bold text-[#000000]">{title}</p>
              </div>
            </div>
            <div className="mt-1  mb-6  flex justify-between">
              <div className="flex  items-center justify-center gap-3">
                <p className="text-md font-medium text-gray-500">Lesson</p>
                <p className="text-md font-semibold  text-gray-500">17</p>
              </div>
              <div className="flex  items-center justify-center gap-3">
                <p className="text-md font-medium text-gray-500">Student</p>
                <p className="text-md font-semibold text-gray-500">198</p>
              </div>
              <div className="flex  items-center justify-center gap-3">
                <FaTrophy size={20} color="silver" />
                <p className="text-md font-semibold  text-gray-500">Beginner</p>
              </div>
            </div>
            <div className="mt-1  mb-4 flex justify-between">
              <button className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-2.5 pl-4 pr-2 text-center text-sm font-medium capitalize leading-tight text-white">
                Start Course
                <MdOutlineKeyboardArrowRight size={20} />
              </button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="relative">
                  <img src={ScoreIcon} width={50} alt="Score Icon" />
                  <p className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 transform text-lg font-bold text-[#000000]">
                    1
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCourses;
