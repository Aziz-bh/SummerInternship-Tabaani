import React, { useEffect, useState } from "react";
import LessonCard from "./components/LessonCard";
import ChaptersCard from "components/card/ChaptersCard";
import { useParams } from "react-router-dom";

const CourseOverview = () => {
  const [lessonData, setLessonData] = useState("");
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.chapters[0].lessons, "baba");
        setLessonData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleLessonClick = (lessonIndex) => {
    setSelectedLessonIndex(lessonIndex);
  };

  if (!lessonData) {
    return <div>Loading...</div>;
  }

  const selectedLesson = lessonData.chapters[0].lessons[selectedLessonIndex];

  return (
    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-12">
      {/* Left Section*/}
      <div className="md:col-span-12 lg:col-span-4">
        {lessonData.chapters && lessonData.chapters.length > 0 && (
          <ChaptersCard
            chapters={lessonData.chapters}
            lessons={selectedLesson || lessonData.chapters[0].lessons}
            onLessonClick={handleLessonClick}
          />
        )}
      </div>

      {/* Right Section*/}
      <div className="md:col-span-12 lg:col-span-8">
        {console.log(selectedLesson.content, "cont")}
        <LessonCard
          key={lessonData.id}
          CourseTitle={lessonData.title}
          LessonTitle={selectedLesson.title}
          content={selectedLesson.content}
          UserPic={lessonData.UserPic}
          video={selectedLesson.video}
        />
      </div>
    </div>
  );
};

export default CourseOverview;
