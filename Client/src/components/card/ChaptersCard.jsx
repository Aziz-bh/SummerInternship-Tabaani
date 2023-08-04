import React, { useState } from "react";

const ChaptersCard = ({
  chapters = [],
  lessons = [],
  onLessonClick,
  onChapterClick,
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
              <div className="flex items-center gap-4">
                <img
                  alt="Avatar"
                  className="h-16 w-16 rounded-lg bg-gray-500 object-cover"
                />
                <span className="text-lg font-medium">{chapter.title}</span>
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
                  chapter.lessons.map((lesson, lessonIndex) =>
                    lesson && lesson.title ? (
                      <li
                        key={lessonIndex}
                        className="cursor-pointer py-2 pl-4"
                        onClick={() => {
                          onLessonClick(lessonIndex);
                          onChapterClick(index);
                        }}
                      >
                        {lesson.title}
                      </li>
                    ) : null
                  )
                ) : (
                  <li>No lessons available for this chapter.</li>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChaptersCard;
