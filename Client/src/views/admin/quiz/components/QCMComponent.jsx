import React, { useState } from 'react';

const QCMComponent = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [rightAnswer, setRightAnswer] = useState([]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRightAnswerChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setRightAnswer(selectedOptions);
  };

  const handleOptionClick = (option) => {
    console.log("Clicked on option:", option);
  };

  return (
    <div>
      <h2>Multiple Choice (QCM)</h2>
      
      <label htmlFor="qcm-question">Question:</label>
      <input
        type="text"
        id="qcm-question"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />

      <label>Options:</label>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <input
              type="text"
              value={option}
              onChange={(event) => handleOptionChange(index, event.target.value)}
            />
            <button onClick={() => handleOptionClick(option)}>Log Option</button>
          </li>
        ))}
      </ul>

      <label htmlFor="qcm-right-answer">Right Answer:</label>
      <select
        id="qcm-right-answer"
        multiple
        value={rightAnswer}
        onChange={handleRightAnswerChange}
      >
        {options.map((option, index) => (
          <option key={index} value={index+1} onClick={()=>console.log("console test option"+(index+1))}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QCMComponent;
