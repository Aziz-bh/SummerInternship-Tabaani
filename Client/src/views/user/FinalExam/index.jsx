import React, { useState, useEffect } from "react";
import Question from "./components/question";
import Ready from "./components/Ready";
import Validate from "./components/Validate";

const FinalExam = ({id}) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showValidate, setShowValidate] = useState(false); 
  const [score, setScore] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/finalexam/byId/"+id)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleAnswerSelect = (questionNumber, selectedOption, questionId) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionNumber]: { selectedOption, questionId },
    }));
  };

  const handleSubmit2 = () => {
        const formattedData = {
          userId:"onRlwU0WuvXAn1K1MY4KcX9jlVR2",
          courseId:id,
          quizzes: Object.entries(selectedAnswers).map(([questionNumber, answerInfo]) => ({
            quizId: answerInfo.questionId,
            selectedAnswer: answerInfo.selectedOption,
          })),
        };

        
        const url = "http://localhost:5000/api/finalexam/checker";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        };
    
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log("🚀 ~ file: index.jsx:46 ~ handleSubmit2 ~ data:", data)
            if (data.score === 100) {
              setScore(data.score);
              setShowValidate(true); 
            }
          })
          .catch(error => console.error("Error sending data:", error));
      };
  const handleSubmit = () => {
    const answersWithIds = Object.entries(selectedAnswers).map(([questionNumber, answerInfo]) => ({
      questionId: answerInfo.questionId,
      selectedOption: answerInfo.selectedOption,
    }));

    
    fetch("http://localhost:5000/done", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answersWithIds),
    })
      .then(response => response.json())
      .then(data => {
      
      })
      .catch(error => console.error("Error sending data:", error));
  };

  return (
    <>
      {score !== 100 &&
  
    <div className="mt-4 rounded-lg border bg-white p-4 shadow-md">
      
      <div className="mx-12">
        <div className="head">
          <div className="lesson-complete text-md font-semibold tracking-wide text-gray-1000">
            Final Assessment
          </div>
          <div className="thats-right-great  mb-10 pb-5 text-4xl font-normal">
            <h1>You Are Ready To Take</h1>
            <h1>The End Of Module Assessment.</h1>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="body w-full">
            {questions.map((q, index) => (
              <Question
                key={index}
                questionNumber={index + 1}
                question={q.question}
                option1={q.option1}
                option2={q.option2}
                option3={q.option3}
                option4={q.option4}
              questionId={q.examId} // Pass question ID to Question
              onSelect={(selectedOption, questionId) =>
                handleAnswerSelect(index + 1, selectedOption, questionId)
              }
              />
            ))}
          </div>

          <button onClick={handleSubmit2} className="rounded-xl bg-blackTheme py-3 px-8 mt-4 text-sm text-white hover:bg-gray-700">
            Submit
          </button>
        </div>
      </div>
    </div>}
    { score === 100 && showValidate && <Validate />}
    </>
  );
};

export default FinalExam;
