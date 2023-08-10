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
      <h2>Single Choice (QCU)</h2>
      
      <label htmlFor="qcu-question">Question:</label>
      <input
        type="text"
        id="qcu-question"
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
          </li>
        ))}
      </ul>
      <button onClick={handleAddOption}>Add Option</button>

      <label htmlFor="qcu-right-answer">Right Answer:</label>
      <select
        id="qcu-right-answer"
        value={rightAnswer}
        onChange={handleRightAnswerChange}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default QCUComponent;
