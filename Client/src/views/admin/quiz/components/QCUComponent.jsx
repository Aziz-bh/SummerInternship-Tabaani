import React, { useState } from 'react';

const QCUComponent = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [rightAnswer, setRightAnswer] = useState('');

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRightAnswerChange = (event) => {
    setRightAnswer(event.target.value);
  };

  return (
    <div>
        <div className="thats-right-great mt-5 mb-10 flex items-center justify-center pb-5 text-4xl font-normal">
      <h2>Single Choice (QCU)</h2>
      </div>
      <div className="flex flex-row">
      <div className="flex flex-col h-full w-1/2">
      <label className="w-full py-4 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300" htmlFor="qcu-question">Question:</label>
      <input
        type="text"
        id="qcu-question"
        className="relative h-14 text-xl"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
</div>
<div className="flex flex-col w-1/2 flex items-center justify-center w-full">
      <label className="w-full py-4 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300" >Options:</label>
      <div className="mt-[-3rem]">
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <input
              type="text"
              value={option}
              className="text-xl px-20"
              style={{ maxWidth: '100%' }} 
              onChange={(event) => handleOptionChange(index, event.target.value)}
            />
          </li>
        ))}
      </ul>
      <button               className="text-xl px-20"
              style={{ maxWidth: '100%' }}  onClick={handleAddOption}>Add Option</button>
      </div>
      </div>
      </div>
      <div className="flex mt-10 mb-10 justify-center items-center">

      <label htmlFor="qcu-right-answer" className=" items-center px-20 py-4 ml-2 text-xl font-medium text-gray-900 dark:text-gray-300" >Right Answer:</label>
      <select
        id="qcu-right-answer"
        className="text-xl px-20" 
        style={{ maxWidth: '100%' }} 
        value={rightAnswer}
        onChange={handleRightAnswerChange}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
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

export default QCUComponent;
