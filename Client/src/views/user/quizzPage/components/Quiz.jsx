import React, { useState, useEffect } from "react";
import { Button } from "components/Button";
import "../../../../assets/css/quiz.css";
import Content from "./Content";
import Result from "./Result";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizIds, setQuizIds] = useState([]);
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const onSubmitAnswer = (answer, quizId) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
    setQuizIds((prevIds) => [...prevIds, quizId]);
    handleNextPage();
  };

  useEffect(() => {}, [userAnswers, quizIds]);

  const [quizData, setQuizData] = useState([]);
  const generalTextContent =
    "This is a use case to check your knowledge about this chapter. Test your understanding of the concepts and topics covered in this chapter with the following quiz. ";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Number of items to display per page

  // Fetch data from the API
  useEffect(() => {
    fetch("http://localhost:5000/api/quizzes/chapter/MXIZbeJX2hjjEX9oQuNF")
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const totalPages = Math.ceil(quizData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const newFN = () => {
    const formattedAnswers = quizIds.map((quizId, index) => {
      const newArray = userAnswers.map((item) =>
        Array.isArray(item) ? item : [item]
      );
      const selectedAnswer = newArray[index] || [];
      return { quizId, selectedAnswer };
    });

    const formattedData = { quizzes: formattedAnswers };

    const url = "http://localhost:5000/api/quizzes/checker";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Process the response from the API here if needed
        console.log(data);
        console.log(data.results);
        console.log(data.score);
        setScore(data.score);
        setShowResult(true);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error sending data to API:", error);
      });
  };

  const getCurrentContent = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return quizData.slice(startIndex, endIndex);
  };

  const isLastPage = currentPage === totalPages;
  const isLastPagePlusOne = currentPage === totalPages + 1;

  // Conditional rendering of the quiz content
  if (quizData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="content">
        <div className="title-container">
          <h1>Check Your Knowledge</h1>
        </div>
        {/* Render the current content */}
        {getCurrentContent().map((quiz) => {
          return (
            <React.Fragment key={quiz.id}>
              <Content
                generaltext={generalTextContent}
                quiz={quiz}
                onSubmitAnswer={(answer) => onSubmitAnswer(answer, quiz.id)}
              />
            </React.Fragment>
          );
        })}

        {/* Show the new button on the last page + 1 */}
        {isLastPagePlusOne && (
          <button
            onClick={newFN}
            className="my-4 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
          >
            SHOW RESULT
          </button>
        )}

        {showResult && score !== null && <Result score={score} />}
      </div>
    </div>
  );
};

export default Quiz;
