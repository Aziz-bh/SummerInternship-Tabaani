import React, { useState, useEffect } from "react";
import { Button } from "components/Button";
import "../../../../assets/css/quiz.css";
import Content from "./Content";

const Quiz = () => {
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

  const getCurrentContent = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return quizData.slice(startIndex, endIndex);
  };

  return (
    <div>
      <div className="content">
        <div className="title-container">
          <h1>Check Your Knowledge</h1>
        </div>
        {/* Render the current content */}
        {getCurrentContent().map((quiz) => {
          console.log(quiz); // Log the content of each quiz
          return (
            <Content
              key={quiz.id}
              generaltext={generalTextContent}
              quiz={quiz}
            />
          );
        })}

        {/* Show the "Submit" button to move to the next page if there are more pages */}
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            value="Submit"
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
