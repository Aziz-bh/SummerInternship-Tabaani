import React, { useEffect, useState } from "react";
import LessonCard from "./components/LessonCard";
import ChaptersCard from "components/card/ChaptersCard";
import { useParams } from "react-router-dom";
import QuizzCard from "components/card/QuizzCard";
import Quiz from "../quizzPage/components/Quiz";

const CourseOverview = () => {
  const [lessonData, setLessonData] = useState("");
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [selectedQuizzIndex, setSelectedQuizzIndex] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "baba");
        setLessonData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleChapterClick = (chapterIndex) => {
    setSelectedChapterIndex(chapterIndex);
    setSelectedLessonIndex(0);
  };

  const handleLessonClick = (lessonIndex) => {
    setSelectedLessonIndex(lessonIndex);
  };

  const handleQuizzClick = (quizzIndex) => {
    setSelectedQuizzIndex(quizzIndex);
  };

  if (!lessonData) {
    return <div>Loading...</div>;
  }

  const selectedChapter = lessonData?.chapters[selectedChapterIndex];

  const selectedLesson = selectedChapter?.lessons[selectedLessonIndex];

  const lessonId = selectedLesson?.id;

  return (
    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-12">
      {/* Left Section*/}
      <div className="md:col-span-12 lg:col-span-4">
        {lessonData.chapters && lessonData.chapters.length > 0 && (
          <ChaptersCard
            chapters={lessonData.chapters}
            lessons={selectedLesson}
            onLessonClick={handleLessonClick}
            onChapterClick={handleChapterClick}
            onQuizzClick={handleQuizzClick}
          />
        )}
      </div>

      {/* Right Section*/}
      {/* Right Section*/}
      <div className="md:col-span-12 lg:col-span-8">
        {/* Display LessonCard or QuizzCard based on selection */}
        {selectedLesson && (
          <LessonCard
            key={lessonData?.id}
            CourseTitle={lessonData?.title}
            LessonTitle={selectedLesson?.title}
            content={selectedLesson?.content}
            UserPic={lessonData?.UserPic}
            video={selectedLesson?.video}
          />
        )}
        {/*<Quiz lessonId={lessonId } />*/}
      </div>
    </div>
  );
};

export default CourseOverview;
