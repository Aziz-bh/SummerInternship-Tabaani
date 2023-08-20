import React, { useEffect, useState } from "react";
import LessonCard from "./components/LessonCard";
import ChaptersCard from "components/admincard/ChaptersCard.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseOverviewad = () => {
  const [lessonData, setLessonData] = useState("");
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLessonData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleLessonClick = (lessonIndex) => {
    setSelectedLessonIndex(lessonIndex);
  };

  const handleChapterClick = (chapterIndex) => {
    setSelectedChapterIndex(chapterIndex);
    setSelectedLessonIndex(0);
  };

  if (!lessonData) {
    return <div>Loading...</div>;
  }

  const selectedChapter = lessonData.chapters[selectedChapterIndex];
  const selectedLesson =
    selectedChapter && selectedChapter.lessons
      ? selectedChapter.lessons[selectedLessonIndex]
      : null;

  return (
    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-12">
      <div className="md:col-span-12 lg:col-span-4">
        <ChaptersCard
          chapters={lessonData.chapters}
          lessons={selectedLesson}
          onLessonClick={handleLessonClick}
          onChapterClick={handleChapterClick}
        />
      </div>

      <div className="md:col-span-12 lg:col-span-8">
        {selectedLesson ? (
          <LessonCard
            key={lessonData.id}
            CourseTitle={lessonData.title}
            LessonTitle={selectedLesson.LessonTitle}
            userpic={lessonData.userpic}
            lessonVideo={selectedLesson.lessonVideo}
            LessonDescription={selectedLesson.LessonDescription}
          />
        ) : (
          <div>No lessons available</div>
        )}
      </div>
    </div>
  );
};

export default CourseOverviewad;
