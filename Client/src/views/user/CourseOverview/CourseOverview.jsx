import React, { useEffect, useState } from "react";
import LessonCard from "./components/LessonCard";
import ChaptersCard from "components/card/ChaptersCard";
import { useParams } from "react-router-dom";

const CourseOverview = () => {
  const [lesson, setLesson] = useState("");
  const id = useParams().id;

  useEffect(() => {
    fetch(`http://localhost:5000/api/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "baba");
        setLesson(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-12">
      {/* Left Section*/}
      <div className="md:col-span-12 lg:col-span-4">
        {/* Verify the structure of the lesson object */}
        {lesson.chapters && lesson.chapters.length > 0 && (
          <ChaptersCard
            chapters={lesson.chapters}
            lessons={lesson.chapters.flatMap((chapter) => chapter.lessons)}
          />
        )}
      </div>

      {/* Right Section*/}
      <div className="md:col-span-12 lg:col-span-8">
        {/* Ensure lessons is an array before mapping */}
        <LessonCard
          key={lesson.id}
          title={lesson.title}
          description={lesson.description}
          UserPic={lesson.UserPic}
          video={lesson.video}
        />
      </div>
    </div>
  );
};

export default CourseOverview;
