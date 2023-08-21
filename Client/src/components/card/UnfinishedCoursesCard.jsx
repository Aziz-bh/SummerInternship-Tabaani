import React from "react";
import Progress from "components/progress";
import { FaTrophy, FaUser, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const UnfinishedCoursesCard = ({
  title,
  image,
  difficulty,
  id,
  chapters,
  instructor,
  progress,
  lessons,
  userpic,
}) => {
  return (
    <div className="bg-neutral-50 border-zinc-100 flex w-full flex-col gap-4 rounded-lg border bg-white md:flex-row lg:pr-6  ">
      <div className="w-full md:w-1/3">
        <img
          className=" h-full rounded-l-lg object-cover md:hidden lg:block "
          src={image}
          alt="picture"
        />
      </div>
      <div className="flex w-full flex-col justify-between md:w-2/3">
        <div className="py-4 pb-4">
          <div className="text-md font-bold md:max-w-md">{title}</div>
        </div>

        <div className="flex flex-wrap justify-between pb-8">
          <div className="flex items-center justify-start gap-2">
            <FaBook size={16} color="silver" />
            <div className="text-zinc-950 text-sm font-medium capitalize text-opacity-75">
              Lessons: {lessons}
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FaUser size={16} color="silver" />
            <div className="text-zinc-950 text-sm font-medium capitalize text-opacity-75">
              Chapters: {chapters}
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FaTrophy size={16} color="silver" />
            <div className="text-zinc-950 text-sm font-medium capitalize text-opacity-75">
              {difficulty}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 pb-4">
          <Progress value={progress} />
          <p className="text-sm"> {progress}%</p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center justify-start gap-2.5">
            <div className="relative h-11 w-11">
              <img
                className="h-11 w-11 rounded-lg object-cover"
                src={userpic}
                alt=""
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1 rounded-lg">
              <div className="text-stone-700 text-sm font-medium leading-snug tracking-tight">
                {instructor}
              </div>
              {/*<div className="text-stone-700 text-xs font-normal tracking-tight text-opacity-75">
                Design teacher
              </div>*/}
            </div>
          </div>
          <Link to={`/course/${id}`}>
            <button className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-2.5 pl-4 pr-2 text-center text-sm font-medium capitalize leading-tight text-white">
              Let's go
              <MdOutlineKeyboardArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnfinishedCoursesCard;
