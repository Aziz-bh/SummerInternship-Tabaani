import React, { useState } from "react";
import chapterIcon from "../../assets/icons/chapter/Vector.png";

const ChaptersCard = ({
  chapters = [],
  onLessonClick,
  onChapterClick,
  onQuizzClick,
  onFinalExamClick,
  showLesson,
  progress,
}) => {
  const [openChapter, setOpenChapter] = useState(null);

  const toggleChapter = (index) => {
    if (openChapter === index) {
      setOpenChapter(null);
    } else {
      setOpenChapter(index);
    }
  };

  return (
    <div className="shadow- rounded-2xl bg-white p-4 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Course Overview</h2>
      <ul>
        {chapters.map((chapter, index) => (
          <li key={index} className="mb-4 border-b border-gray-300 pb-4">
            <div className="flex items-center justify-between">
              <div className=" flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffaf20]">
                  <img
                    alt="Avatar"
                    className="h-[2.5rem] w-[2.5rem] rounded-lg  object-contain "
                    src={chapterIcon}
                  />
                </div>
                <span className="whitespace-wrap text-xl font-bold">
                  {chapter.title}
                </span>
              </div>

              <button
                type="button"
                className="p-1"
                onClick={() => toggleChapter(index)}
              >
                {openChapter === index ? (
                  <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                )}
              </button>
            </div>
            {openChapter === index && (
              <ul className="mt-2">
                {chapter.lessons && chapter.lessons.length > 0 ? (
                  chapter.lessons.map((lesson, lessonIndex) => {
                    let nextLessonId = null;

                    if (lessonIndex < chapter.lessons.length - 1) {
                      const nextLesson = chapter.lessons[lessonIndex + 1];
                      nextLessonId = nextLesson.id;
                    }

                    return lesson && lesson.LessonTitle ? (
                      lesson && lesson.LessonTitle ? (
                        <li
                          key={lessonIndex}
                          className={`py-2 pl-4 ${
                            progress >= lessonIndex
                              ? "cursor-pointer py-2 pl-4"
                              : "cursor-not-allowed text-gray-400"
                          }`}
                          onClick={() => {
                            if (progress >= lessonIndex) {
                              onChapterClick(index);
                              onLessonClick(lessonIndex);
                            }
                          }}
                        >
                          <span
                            className={`py-2 pl-4 ${
                              progress >= lessonIndex
                                ? "cursor-pointer py-2 pl-4 hover:text-yellow-500"
                                : "cursor-not-allowed text-gray-400"
                            }`}
                            onClick={() => {
                              if (progress >= lessonIndex) showLesson();
                            }}
                          >
                            {lesson.LessonTitle}
                          </span>
                          {/* Quizzes */}
                          {
                            <ul className=" mt-2 list-disc  pl-4">
                              {(lessonIndex, lesson) => (
                                <li
                                  key={lessonIndex}
                                  onClick={() => {
                                    if (progress >= lessonIndex)
                                      onQuizzClick(lessonIndex,nextLessonId);
                                  }}
                                  className="cursor-pointer py-2"
                                >
                                  <span
                                    className={`py-2 pl-4 ${
                                      progress >= lessonIndex
                                        ? "cursor-pointer py-2 pl-4 hover:text-yellow-500"
                                        : "cursor-not-allowed text-gray-400"
                                    }`}
                                  >
                                    quiz
                                  </span>
                                </li>
                              )}

                              <>
                                <p
                                  key={lessonIndex}
                                  onClick={() => {
                                    if (progress >= lessonIndex)
                                    onQuizzClick(lessonIndex,nextLessonId);
                                  }}
                                >
                                  Quick Quiz {lessonIndex}
                                </p>
                              </>
                            </ul>
                          }
                        </li>
                      ) : null
                    ) : null;
                  })
                ) : (
                  <li>No lessons available for this chapter.</li>
                )}
                <li
                  key="final-assessment"
                  onClick={() => {
                    onFinalExamClick(index); // Handle the click event for the final exam
                  }}
                  className="cursor-pointer py-2"
                >
                  <span className="hover:text-red-500">Final Assessment</span>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChaptersCard;
