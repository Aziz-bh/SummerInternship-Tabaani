import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

const LessonCard = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }

    setIsPlaying(!isPlaying);
  };
  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        Course – Introduction to Hosting
      </h2>

      {/* Video Container */}
      <div className="mb-4 h-full w-full overflow-hidden rounded-3xl border-2 border-gray-300 bg-gray-100">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Ades3pQbeh8"
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
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
          alt="Avatar"
          className="mr-2 h-10 w-10 rounded-full object-cover"
        />
        <p className="font-semibold">Lesson 1 – Implement Story telling</p>
      </div>
      <p>
        This module would provide strategies for providing exceptional customer
        service and creating a welcoming and comfortable environment for
        visitors. It would cover topics such as communication skills,
        problem-solving, and attention to detail. Participants would learn how
        to anticipate and respond to the needs of visitors, and how to create a
        hospitable and inclusive environment for all.
      </p>
    </div>
  );
};

export default LessonCard;
