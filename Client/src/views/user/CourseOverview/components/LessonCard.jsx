import React from "react";
import ReactPlayer from "react-player";

const LessonCard = ({ title, UserPic, video, chapters, description }) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>

      {/* Video Container */}
      <div className="mb-4 h-full w-full overflow-hidden rounded-3xl border-2 border-gray-300 bg-gray-100">
        <ReactPlayer
          url={video}
          type="video/webm"
          controls={false}
          volume={0.6}
          muted={false}
          loop={false}
          width="100%"
        />
      </div>

      <div className="mb-4 flex items-center">
        <img
          src={UserPic}
          alt="Avatar"
          className="mr-2 h-10 w-10 rounded-full object-cover"
        />
        <p className="font-semibold">{chapters}</p>
      </div>
      <p>{description}</p>
      <div className="flex flex-row-reverse gap-3">
        <button className="mt-4 flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-4 pl-6 pr-6 text-center text-sm font-medium capitalize leading-tight text-white">
          Test Your Knowledge
        </button>
        <button className="border-zinc-100 mt-4  inline-flex  items-center justify-start gap-3 rounded-[10px] border py-4  pl-6 pr-6 text-center text-sm font-medium capitalize leading-tight ">
          Skip To the Test
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
