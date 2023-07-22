import bookIcon from "assets/icons/bookIcon.png";
import Progress from "components/progress";
import { FaTrophy } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";

const UnfinishedCoursesCard = ({ title, image, pic, points }) => {
  return (
    <div className="bg-neutral-50 border-zinc-100 inline-flex w-full items-start justify-start gap-4 rounded-lg border bg-white">
      <div className="h-56 w-[356px] rounded-[10px]">
        <img
          className=" h-56 rounded-l-lg object-cover md:hidden lg:block "
          src={image}
          alt="picture"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="inline-flex flex-col items-start justify-start gap-2 py-4 pb-6">
          <div className="text-zinc-950 h-[19px] w-[329px] text-base font-bold">
            {title}
          </div>
        </div>

        <div className="inline-flex items-center justify-between pb-8 pr-6">
          <div className="flex items-center justify-start gap-2">
            <FaBook size={16} color="silver" />
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              Lesson : 6
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FaUser size={16} color="silver" />
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              student : 198
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FaTrophy size={16} color="silver" />
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              Beginner
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-between pb-2 pr-6">
          <Progress value={75} />
        </div>

        <div className="inline-flex items-center justify-between pb-6 pr-6">
          <div className="flex items-center justify-start gap-1">
            <p className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              Points :
            </p>
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              75 / 100
            </div>
          </div>

          <div className="flex items-center justify-start gap-1">
            <p className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              Days:
            </p>
            <div className="text-zinc-950 text-[13px] font-medium capitalize text-opacity-75">
              56
            </div>
          </div>
        </div>

        <div className="inline-flex items-end justify-between pr-4">
          <div className="flex h-11 items-center justify-start gap-2.5">
            <div className="relative h-11 w-11">
              <img className="h-11 w-11 rounded-lg" src={pic} alt="" />
            </div>
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-1 rounded-lg">
              <div className="text-stone-700 self-stretch text-sm font-medium leading-snug tracking-tight">
                Jon Kantner
              </div>
              <div className="text-stone-700 l text-xs font-normal tracking-tight text-opacity-75">
                Design teacher
              </div>
            </div>
          </div>
          <button className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-2.5 pl-6 pr-6 text-center text-sm font-medium capitalize leading-tight text-white">
            Let's go
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnfinishedCoursesCard;
