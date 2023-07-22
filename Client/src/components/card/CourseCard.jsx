import Card from "components/card";
import { FaTrophy } from "react-icons/fa";
import ScoreIcon from "assets/icons/ScoreIcon.png";

const CourseCard = ({ title, image, extra }) => {
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
        </div>

        <div className="p-![18px] mb-6 flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div>
            <p className=" text-lg font-bold dark:text-white ">{title}</p>
          </div>
        </div>
        <div className="mt-1  mb-6  flex justify-between">
          <div className="flex  items-center justify-center gap-3">
            <p className="text-md font-semibold">Lesson</p>
            <p className="text-md font-semibold  dark:text-white">17</p>
          </div>
          <div className="flex  items-center justify-center gap-3">
            <p className="text-md font-semibold">Student</p>
            <p className="text-md font-semibold  dark:text-white">198</p>
          </div>
          <div className="flex  items-center justify-center gap-3">
            <FaTrophy size={20} color="silver" />
            <p className="text-md font-semibold  dark:text-white">Beginner</p>
          </div>
        </div>
        <div className="mt-1  mb-4 flex justify-between">
          <button className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-2.5 pl-6 pr-6 text-center text-sm font-medium capitalize leading-tight text-white">
            Start Course
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div class="relative">
              <img src={ScoreIcon} width={50} alt="Score Icon" />
              <p class="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 transform text-lg font-bold">
                1
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
