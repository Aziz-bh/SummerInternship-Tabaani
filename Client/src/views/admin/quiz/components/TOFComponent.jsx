import React, { useState } from "react";

const TOFComponent = () => {
  const [question, setQuestion] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  return (
    <div>
      <div className="thats-right-great mt-5 mb-10 flex items-center justify-center pb-5 text-4xl font-normal">
        <h2>True Or Flase Question</h2>
      </div>

<div className="flex flex-row">
      <div className="flex flex-col h-full w-1/2">
        <label htmlFor="tof-question" className="w-full py-4 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Question:</label>
        <input
          type="text"
          id="tof-question"
          className="relative h-14 text-xl"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      </div>

      <div className="flex flex-col w-1/2 flex items-center justify-center">
        <div className="w-full">

        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
    <div className="">
    <input
            type="radio"
            name="tof-choice"
            value="true"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={selectedChoice === "true"}
            onChange={handleChoiceChange}
          />    </div>

<label for="bordered-radio-1" className="w-full py-4 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">TRUE</label>
</div>

      </div>
      <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 w-full">



          <input
            type="radio"
            name="tof-choice"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            value="false"
            checked={selectedChoice === "false"}
            onChange={handleChoiceChange}
          />{" "}
 
 <label for="bordered-radio-1" className="w-full py-4 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">FLASE</label>
      </div>
      </div>
      </div>
      
      <div className="rounded-md shadow-sm flex justify-center" role="group">
      <button
  
    className="bg-blackTheme hover:bg-gray-700 text-white text-md px-20 rounded-xl pt-5 pb-5 mt-5"
  >
    Submit
  </button>
      </div>
    </div>
  );
};

export default TOFComponent;
