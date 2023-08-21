import React, { useState, useEffect } from "react";

const QuizList = (lessonId) => {
  const [quizzes, setQuizzes] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    fetchQuizzes(); // Fetch quizzes on component mount
  }, []);

  const fetchQuizzes = () => {
    fetch(
      "http://localhost:5000/api/quizzes/chapter/" + lessonId.lessonId.lessonId
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          console.log("🚀 ~ file: QuizList.jsx:23 ~ fetchQuizzes ~ data:", data)
          return setQuizzes(data)
      })
      .catch((error) => console.error("Error fetching quizzes:", error));
  };

  return (
    <div className="text-center">
      <button
        className={`bg-transparent text-black border-black rounded-full border px-6 py-2 text-lg ${
          showQuiz ? "mb-4" : ""
        }`}
        onClick={() => {
          setShowQuiz(!showQuiz);
          if (!quizzes.length) {
            fetchQuizzes(); // Fetch quizzes on button click if not already fetched
          }
        }}
      >
        {showQuiz ? "Hide Quiz" : "Show Quiz"}{" "}
        <span className={`transform ${showQuiz ? "rotate-180" : ""}`}></span>
      </button>
      {showQuiz && (
  <div className="rounded-md bg-white p-4 shadow-md">
    {quizzes.length > 0 ? (
      quizzes.map(quiz => (
        <div key={quiz.id} className="mb-8">
          <div className=" justify-between">
            <h2 className="text-lg font-medium">{quiz.question}</h2>
            <button className="text-red-500 hover:underline">Delete</button>
          </div>
          <div className="mt-2 text-gray-600">
            <p>Option 1: {quiz.option1}</p>
            <p>Option 2: {quiz.option2}</p>
            {quiz.option3 && <p>Option 3: {quiz.option3}</p>}
            {quiz.option4 && <p>Option 4: {quiz.option4}</p>}
            <p className="text-blue-500">
              Right Answer: {quiz.rightAnswer.join(", ")}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p>No quizzes available.</p>
    )}
  </div>
)}
    </div>
  );
};

export default QuizList;
