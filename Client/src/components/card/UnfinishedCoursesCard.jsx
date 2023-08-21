import Progress from "components/progress";
import { FaTrophy } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const UnfinishedCoursesCard = ({
  title,
  image,
  userpic,
  difficulty,
  id,
  chaptersnumber,
  instructor,
  progress,
}) => {
  const progressValue = 50;
  return (
    <div className="bg-neutral-50 border-zinc-100 inline-flex w-full items-start justify-start gap-4 rounded-lg border bg-white pr-6">
      <div className="h-56 w-[356px] rounded-[10px]">
        <img
          className=" h-56 rounded-l-lg object-cover md:hidden lg:block "
          src={image}
          alt="picture"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="inline-flex flex-col items-start justify-start gap-2 py-4 pb-4">
          <div className="text-md w-[329px] font-bold">{title}</div>
        </div>

        <div className="inline-flex items-center justify-between pb-8">
          <div className="flex items-center justify-start gap-2">
            <FaBook size={16} color="silver" />
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              Lesson : 6
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FaUser size={16} color="silver" />
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              chapters : {chaptersnumber}
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FaTrophy size={16} color="silver" />
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              {difficulty}
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-between gap-2 pb-4">
          <Progress value={progress} />
          <p className=" text-sm"> {progress}%</p>
        </div>

        <div className="inline-flex items-end justify-between">
          <div className="flex h-11 items-center justify-start gap-2.5">
            <div className="relative h-11 w-11">
              <img
                className="h-11 w-11 rounded-lg object-cover"
                src={userpic}
                alt=""
              />
            </div>
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-1 rounded-lg">
              <div className="text-stone-700 self-stretch text-sm font-medium leading-snug tracking-tight">
                {instructor}
              </div>
              {/*<div className="text-stone-700 l text-xs font-normal tracking-tight text-opacity-75">
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
