import React, { useState } from "react";

const chaptersData = [
  {
    title: "Cultural Immersion",
    quizzes: ["Quiz 1.1", "Quiz 1.2", "Quiz 1.3"],
  },
  {
    title: "StroyTelling",
    quizzes: ["Quiz 2.1", "Quiz 2.2", "Quiz 2.3"],
  },
  {
    title: "Hospitality",
    quizzes: ["Quiz 3.1", "Quiz 3.2", "Quiz 3.3"],
  },
  {
    title: "Safety and Security",
    quizzes: ["Quiz 4.1", "Quiz 4.2", "Quiz 4.3"],
  },

  // Add more chapters and quizzes as needed
];

const ChaptersCard = ({ chapters }) => {
  const [openChapter, setOpenChapter] = useState(null);

  const toggleChapter = (index) => {
    if (openChapter === index) {
      setOpenChapter(null);
    } else {
      setOpenChapter(index);
    }
  };

  return (
    <div className="shadow- rounded-2xl bg-white p-4">
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
            {/*}{openChapter === index && (
              <ul className="mt-2">
                {chapter.quizzes.map((quiz, quizIndex) => (
                  <li key={quizIndex} className="py-2 pl-4">
                    {quiz}
                  </li>
                ))}
              </ul>
                )}*/}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChaptersCard;
