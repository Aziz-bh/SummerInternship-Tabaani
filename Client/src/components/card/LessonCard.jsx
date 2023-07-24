import React from "react";
import ReactPlayer from "react-player";

const LessonCard = () => {
  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      {/* Title */}
      <h2 className="mb-4 text-2xl font-bold">Course Title</h2>

      {/* Video Container */}
      <div className="mb-4 h-full w-full rounded-lg">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Ades3pQbeh8"
          controls={true}
          volume={0.6}
          muted={false}
          loop={false}
          width="100%"
        />
      </div>

      {/* Avatar Picture and Title */}
      <div className="mb-4 flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="Avatar"
          className="mr-2 h-10 w-10 rounded-full"
        />
        <p className="font-semibold">Instructor Name</p>
      </div>

      {/* Description */}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
        dictum turpis ac interdum. Suspendisse potenti. Fusce at dolor euismod,
        euismod justo quis, ullamcorper nisi. In vel magna vitae turpis
        facilisis scelerisque.
      </p>
    </div>
  );
};

export default LessonCard;
