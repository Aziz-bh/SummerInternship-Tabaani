import React, { useState } from "react";

const Question = ({
  question,
  option1,
  option2,
  option3,
  option4,
  questionNumber,
  questionId,
  onSelect,
}) => {
  const [selectedA, setSelectedA] = useState(false);
  const [selectedB, setSelectedB] = useState(false);
  const [selectedC, setSelectedC] = useState(false);
  const [selectedD, setSelectedD] = useState(false);

  const handleToggleA = () => {
    setSelectedA(!selectedA);
    setSelectedB(false)
    setSelectedC(false)
    setSelectedD(false)
    onSelect("option1", questionId); // Pass question ID to onSelect
  };
  const handleToggleB = () => {
    setSelectedB(!selectedB);
    setSelectedA(false)
    setSelectedC(false)
    setSelectedD(false)
    onSelect("option2", questionId); // Pass question ID to onSelect
  };

  const handleToggleC = () => {
    setSelectedC(!selectedC);
    setSelectedA(false)
    setSelectedB(false)
    setSelectedD(false)
    onSelect("option3", questionId); // Pass question ID to onSelect
  };

  const handleToggleD = () => {
    setSelectedD(!selectedD);
    setSelectedA(false)
    setSelectedC(false)
    setSelectedB(false)
    onSelect("option4", questionId); // Pass question ID to onSelect
  };

  return (
    <div className="flex w-full flex-col">
      <div className=" flex flex-rw">
        <div className="body ">
          <div className="lesson-complete text-sm font-semibold tracking-wide text-gray-1000">
            Question {questionNumber}
          </div>

          <h1 className="general-question w-full ">{question}</h1>
        </div>
      </div>

      <div className="option-A mt-4 flex items-center">

        <div
          className={`md:ml-24 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ${
            selectedA ? "bg-customBlue" : "bg-white"
          } border border-gray-400`}
          onClick={handleToggleA}
        >
          <span
            className={`text-xl ${
              selectedA ? "font-bold text-white" : "font-bold text-gray-400"
            }`}
          >
            A
          </span>
        </div>

        <h1 className="ml-4 text-xl font-bold md:tracking-wide text-gray-1300">
          {option1}
        </h1>
      </div>

      <div className="option-B mt-4 flex items-center">
        <div
          className={`md:ml-24 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ${
            selectedB ? "bg-customBlue" : "bg-white"
          } border border-gray-400`}
          onClick={handleToggleB}
        >
          <span
            className={`text-xl ${
              selectedB ? "font-bold text-white" : "font-bold text-gray-400"
            }`}
          >
            B
          </span>
        </div>

        <h1 className="ml-4 text-xl font-bold tracking-wide text-gray-1300">
          {option2}
        </h1>
      </div>

      <div className="option-C mt-4 flex items-center">
        <div
          className={`md:ml-24 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ${
            selectedC ? "bg-customBlue" : "bg-white"
          } border border-gray-400`}
          onClick={handleToggleC}
        >
          <span
            className={`text-xl ${
              selectedC ? "font-bold text-white" : "font-bold text-gray-400"
            }`}
          >
            C
          </span>
        </div>

        <h1 className="ml-4 text-xl font-bold tracking-wide text-gray-1300">
          {option3}
        </h1>
      </div>

      <div className="option-D mt-4 flex items-center">
        <div
          className={`md:ml-24 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ${
            selectedD ? "bg-customBlue" : "bg-white"
          } border border-gray-400`}
          onClick={handleToggleD}
        >
          <span
            className={`text-xl ${
              selectedD ? "font-bold text-white" : "font-bold text-gray-400"
            }`}
          >
            D
          </span>
        </div>

        <h1 className="ml-4 text-xl font-bold tracking-wide text-gray-1300">
          {option4}
        </h1>
      </div>

      <div className="my-7 border-t border-gray-300"></div>
    </div>
  );
};

export default Question;
