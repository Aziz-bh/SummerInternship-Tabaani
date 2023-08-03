import React, { useState } from "react";

const TrueFalseQuestion = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState(null);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="quiz">
        <div className="question">{question}</div>
        <div className="answer">
          <div className="options">
            <button
              className={`option-button ${
                selectedOption === "true" ? "selected-true" : ""
              }`}
              onClick={() => handleOptionClick("true")}
            >
              TRUE
            </button>
            <button
              className={`option-button ${
                selectedOption === "false" ? "selected-false" : ""
              }`}
              onClick={() => handleOptionClick("false")}
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
