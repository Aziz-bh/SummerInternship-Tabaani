import React, { useState, useEffect } from "react";
import { Button } from "components/Button";
import "../../../../assets/css/quiz.css";
import Content from "./Content";
import Result from "./Result";

const Quiz = (lessonId, id) => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  console.log("🚀 ~ file: Quiz.jsx:10 ~ Quiz ~ user:", user.uid);
  console.log("🚀 ~ file: Quiz.jsx:10 ~ Quiz ~ user:", user.uid);
  console.log("🚀 ~ file: Quiz.jsx:10 ~ Quiz ~ user:", user.uid);
  console.log("🚀 ~ file: Quiz.jsx:10 ~ Quiz ~ user:", user.uid);
  console.log("🚀 ~ file: Quiz.jsx:10 ~ Quiz ~ user:", user.uid);
  console.log("🚀 ~ file: Quiz.jsx:10 ~ Quiz ~ user:", user.uid);

  const [userAnswers, setUserAnswers] = useState([]);
  const [quizIds, setQuizIds] = useState([]);
  const [score, setScore] = useState(null);
  const [ans, setAns] = useState(null);
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
  const [quizDataNotFound, setQuizDataNotFound] = useState(false);
  // Fetch data from the API
  useEffect(() => {
    fetch("http://localhost:5000/api/quizzes/chapter/" + lessonId.lessonId)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data not found");
        }
        return response.json();
      })
      .then((data) => {
        setQuizData(data);
        setQuizDataNotFound(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setQuizDataNotFound(true);
      });
  }, [lessonId]);
  if (quizDataNotFound) {
    return <p>Quiz not found.</p>;
  }

  const totalPages = Math.ceil(quizData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const newFN = () => {
    const formattedAnswers = quizIds?.map((quizId, index) => {
      const newArray = userAnswers.map((item) =>
        Array.isArray(item) ? item : [item]
      );
      setShowResult(true);
      const selectedAnswer = newArray[index] || [];
      return { quizId, selectedAnswer };
    });

    const formattedData = {
  uid: user.uid, 
  quizzes: formattedAnswers
};

    const url = "http://localhost:5000/api/quizzes/checker/";
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
        setScore(data.score);
        setAns(data.results);
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

  if (quizData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="content">
        {showResult ? (
          <Result score={score} ans={ans} />
        ) : (
          <>
            <div className="title-container">
              <h1>Check Your Knowledge</h1>
            </div>
            {/* Render the current content */}
            {getCurrentContent()?.map((quiz) => {
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

            {isLastPagePlusOne && (
              <button
                onClick={newFN}
                className="my-4 rounded bg-blackTheme py-4 px-8 font-bold text-white hover:bg-blackTheme"
              >
                SHOW RESULT
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
