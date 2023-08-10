import React, { useState } from 'react';

const TOFComponent = () => {
  const [question, setQuestion] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  return (
    <div>
      <h2>True or False</h2>
      
      <label htmlFor="tof-question">Question:</label>
      <input
        type="text"
        id="tof-question"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />

      <label>
        <input
          type="radio"
          name="tof-choice"
          value="true"
          checked={selectedChoice === 'true'}
          onChange={handleChoiceChange}
        /> True
      </label>
      <label>
        <input
          type="radio"
          name="tof-choice"
          value="false"
          checked={selectedChoice === 'false'}
          onChange={handleChoiceChange}
        /> False
      </label>
    </div>
  );
};

export default TOFComponent;
