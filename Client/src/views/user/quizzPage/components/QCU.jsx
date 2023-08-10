import React, { useState } from "react";

const QCU = ({ quiz, onSubmitAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
    onSubmitAnswer(option); // Submit the answer
  };

  return (
    <div>
    <div className="question text-center pt-1 pb-10 custom-top-margin">{quiz.question}</div>


<div className=" md:grid grid-cols-2 gap-4 w-auto mx-auto">
  <button
    className={`option-button2 ${selectedOption === "option1" ? "selected" : ""}`}
    onClick={() => handleOptionClick("option1")}
  >
   <p className="opt"> {quiz.option1}</p> 
  </button>
  <button
    className={`option-button2 ${selectedOption === "option2" ? "selected" : ""}`}
    onClick={() => handleOptionClick("option2")}
  >
     <p className="opt"> {quiz.option2}</p> 
  </button>
  <button
    className={`option-button2 ${selectedOption === "option3" ? "selected" : ""}`}
    onClick={() => handleOptionClick("option3")}
  >
     <p className="opt"> {quiz.option3}</p> 
  </button>
  <button
    className={`option-button2 ${selectedOption === "option4" ? "selected" : ""}`}
    onClick={() => handleOptionClick("option4")}
  >
   <p className="opt"> {quiz.option4}</p> 
  </button>
</div>
    </div>
  );
};

export default QCU;
