import React, { useState } from "react";

const FinalExamAdd = ({id}) => {
  const [finalExamQuizzes, setFinalExamQuizzes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [rightAnswer, setRightAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleRightAnswerChange = (event) => {
    setRightAnswer(event.target.value);
  };


  const handleSubmit = () => {
    const newQuiz = {
      question: question,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      rightAnswer: [rightAnswer]
    };

    fetch('http://localhost:5000/api/finalexam/add/'+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuiz)
    })
    .then(response => response.json())
    .then(data => {
      // Handle success response
      setQuestion('');
      setOptions(['', '', '', '']);
      setRightAnswer([]);
      console.log('Quiz added successfully:', data);
    })
    .catch(error => {
      // Handle error
      console.error('Error adding quiz:', error);
    });
  };

  const getFinalExamQuizzes = () => {
    fetch(`http://localhost:5000/api/finalexam/byId/`+id)
      .then((response) => response.json())
      .then((data) => {
        setFinalExamQuizzes(data);
        console.log(
          "🚀 ~ file: index.jsx:12 ~ getFinalExamQuizzes ~ setFinalExamQuizzes:",
          finalExamQuizzes
        );

        setIsModalVisible(!isModalVisible);
      })
      .catch((error) => console.error("Error fetching quizzes:", error));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="">
      <div className="">
        <button
          className="mt-4 mr-5 rounded-xl bg-blackTheme py-3 px-20 text-sm text-white hover:bg-gray-700"
          onClick={getFinalExamQuizzes}
        >
          {isModalVisible ? "HIDE EXAM QUESTIONS" : "SHOW EXAM QUESTIONS"}
        </button>
        <button
          className="mt-4 ml-5 rounded-xl bg-blackTheme py-3 px-20 text-sm text-white hover:bg-gray-700"
          onClick={openModal}
        >
          ADD NEW EXAM QUIZ
        </button>

      </div>
      <div className="flex items-center justify-center">
        {isModalOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm backdrop-filter mt-10">
            <div
              className="tailwind w-2/5 overflow-y-auto rounded bg-white p-4 shadow-lg"
              style={{ maxHeight: "80vh", marginLeft: "20%" }}
            >
              <h2 className="mb-4 items-center justify-center text-xl font-semibold">
                NEW EXAM QUIZ
              </h2>
              <div className="flex flex-col h-full w-1/2">
          <label className="w-full py-4 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300" htmlFor="qcu-question">Question:</label>
          <input
            type="text"
            id="qcu-question"
            className="relative h-14 text-xl bg-gray-100"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2 flex items-center justify-center w-full">
          <label className="w-full py-4 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300" >Options:</label>
          <div className="">
            <ul>
              {options.map((option, index) => (
                <li className="bg-gray-700" key={index}>
                  <input
                    type="text"
                    value={option}
                    className="text-xl px-20 bg-gray-100"
                    style={{ maxWidth: '100%' }} 
                    onChange={(event) => handleOptionChange(index, event.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex mt-10 mb-5 ">
        <label htmlFor="qcu-right-answer" className=" items-center py-4 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300" >Right Answer:</label>
        <select
          id="qcu-right-answer"
          className="text-xl px-20" 
          style={{ maxWidth: '100%' }} 
          value={rightAnswer}
          onChange={handleRightAnswerChange}
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={"option"+(index+1)}>{option}</option>
          ))}
        </select>
      </div>
              

              
              <button
              onClick={handleSubmit}
                className="mx-auto  rounded bg-blackTheme px-20 py-2 text-white hover:bg-blackTheme focus:outline-none"
              >
                SAVE
              </button>
              <button
              onClick={closeModal}
                className="mx-10 rounded bg-white px-20 py-2 text-gray-600 hover:bg-blackTheme focus:outline-none"
              >
               CANCEL
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalVisible && (
        <div className="modal">
          {finalExamQuizzes.map((quiz, index) => (
            <div key={index} className="quiz-item">
              <h3>Question {index + 1}</h3>
              <p>{quiz.question}</p>
              <p>right answer : {quiz.rightAnswer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinalExamAdd;
