import React, { useState } from "react";

const TrueFalseQuestion = ({ question, onSubmitAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
    onSubmitAnswer(option); // Submit the answer
  };


  return (
    <div>
      <div className="quiz">
        <div className="question">{question}</div>
        <div className="answer">
          <div className="options">
            <button
              className={`option-button ${
                selectedOption === "option1" ? "selected-true" : ""
              }`}
              onClick={() => handleOptionClick("option1")}
            >
              TRUE
            </button>
            <button
              className={`option-button ${
                selectedOption === "option2" ? "selected-false" : ""
              }`}
              onClick={() => handleOptionClick("option2")}
            >
              FALSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseQuestion;
