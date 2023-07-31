import React, { useState } from "react";

const QCM = ({ quiz }) => {
  const { question, option1, option2, option3, option4, type } = quiz;

  // State to keep track of the selected options
  const [selectedOptions, setSelectedOptions] = useState({});

  // Function to handle the toggle of options
  const handleToggle = (option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option], // Toggle the option state
    }));
  };

  return (
    <div>
      <div className="question-QCM">{question}</div>
      <div className="answer">
        {/* Render options in lines with toggle buttons */}
        <div className="options-container">
          <div
            className={`option-line ${selectedOptions[option1] ? "selected" : ""}`}
            onClick={() => handleToggle(option1)}
          >
            <span>{option1}</span>
            <label className="relative inline-block w-14 h-7 ml-3 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={selectedOptions[option1]}
                onChange={() => handleToggle(option1)}
              />
              <div className={`w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
            </label>
          </div>
          <div
            className={`option-line ${selectedOptions[option2] ? "selected" : ""}`}
            onClick={() => handleToggle(option2)}
          >
            <span>{option2}</span>
            <label className="relative inline-block w-14 h-7 ml-3 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={selectedOptions[option2]}
                onChange={() => handleToggle(option2)}
              />
              <div className={`w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
            </label>
          </div>
          <div
            className={`option-line ${selectedOptions[option3] ? "selected" : ""}`}
            onClick={() => handleToggle(option3)}
          >
            <span>{option3}</span>
            <label className="relative inline-block w-14 h-7 ml-3 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={selectedOptions[option3]}
                onChange={() => handleToggle(option3)}
              />
              <div className={`w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
            </label>
          </div>
          <div
            className={`option-line ${selectedOptions[option4] ? "selected" : ""}`}
            onClick={() => handleToggle(option4)}
          >
            <span>{option4}</span>
            <label className="relative inline-block w-14 h-7 ml-3 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={selectedOptions[option4]}
                onChange={() => handleToggle(option4)}
              />
              <div className={`w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QCM;
