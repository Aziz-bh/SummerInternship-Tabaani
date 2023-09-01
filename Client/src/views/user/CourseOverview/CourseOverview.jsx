import React, { useEffect, useState } from "react";
import LessonCard from "./components/LessonCard";
import ChaptersCard from "components/card/ChaptersCard";
import { useParams } from "react-router-dom";
import Quiz from "../quizzPage/components/Quiz";
import FinalExam from "../FinalExam";
import Ready from "../FinalExam/components/Ready";

const CourseOverview = () => {
  const [courseData, setCourseData] = useState("");
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [selectedQuizzIndex, setSelectedQuizzIndex] = useState("");
  const [nextLesson, setnextLesson] = useState("");
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [selectedFinalExamIndex, setSelectedFinalExamIndex] = useState("");
const [isFinalExamVisible, setIsFinalExamVisible] = useState(false);
const [updateChaptersCard, setUpdateChaptersCard] = useState(false);
const [progress, setProgress] = useState(null);


const handleFinalExamClick = (finalExamIndex) => {
  setSelectedFinalExamIndex(finalExamIndex);
  setIsFinalExamVisible(true);
};

useEffect(() => {
  setUpdateChaptersCard(true); // Trigger an update
}, [progress, selectedLessonIndex]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "baba");
        setCourseData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user.uid,
            courseId: id
          })
        });

        const data = await response.json();

        setProgress(data.progress);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChapterClick = (chapterIndex) => {
    setSelectedChapterIndex(chapterIndex);
    setSelectedLessonIndex(0);
  };

  const showLesson = () => {
    setIsQuizVisible(false);
    setIsFinalExamVisible(false);
  };

  const handleQuizzClick = (quizzIndex,nextLessonId) => {
    setnextLesson({nextLessonId});
    setSelectedQuizzIndex(quizzIndex);
    setIsQuizVisible(true);
    setIsFinalExamVisible(false);
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const selectedChapter = courseData?.chapters[selectedChapterIndex];
  console.log("selectedChapter", selectedChapter);

  const selectedLesson = selectedChapter?.lessons[selectedLessonIndex];
  console.log("selectedLesson", selectedLesson);

  const lessonId = selectedLesson?.id;
  const nextLessonId = selectedChapter?.lessons[selectedLessonIndex+1]?.id;
  const index = selectedLessonIndex;

  const handleLessonClick = (lessonIndex) => {
    setSelectedLessonIndex(lessonIndex);
    if(lessonIndex>progress){

    setProgress(progress+1)
  }
  };

  return (
    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-12">
      {/* Left Section*/}
      <div className="md:col-span-12 lg:col-span-4">
  {updateChaptersCard && courseData.chapters && courseData.chapters.length > 0 && (
    <ChaptersCard
      chapters={courseData.chapters}
      lessons={selectedLesson}
      onLessonClick={handleLessonClick}
      onChapterClick={handleChapterClick}
      onQuizzClick={handleQuizzClick}
      onFinalExamClick={handleFinalExamClick} 
      showLesson={showLesson}
      progress={progress}
    />
  )}
</div>


  
      <div className="md:col-span-12 lg:col-span-8">
        {/* Display LessonCard or QuizzCard based on selection */}
        {!isFinalExamVisible && !isQuizVisible && selectedLesson && (
          <LessonCard
            key={courseData?.id}
            CourseTitle={courseData?.title}
            LessonTitle={selectedLesson?.LessonTitle}
            content={selectedLesson?.LessonDescription}
            lessonVideo={selectedLesson?.lessonVideo}
            userpic={courseData?.instructor.userpic}
          />
        )}
        {!isFinalExamVisible && isQuizVisible && <Quiz lessonId={lessonId} showLesson={showLesson} nextLessonId={nextLessonId} index={index} onLessonClick={handleLessonClick}/>}
        {isFinalExamVisible && <Ready id={id} />}

      </div>
    </div>
  );
};

export default CourseOverview;
