import React, { useState } from 'react';
import TOFComponent from './components/TOFComponent';
import QCMComponent from './components/QCMComponent';
import QCUComponent from './components/QCUComponent';

const NewQuiz = () => {
  const [selectedChoice, setSelectedChoice] = useState('');

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-2">Add New Quiz</h1>
      
      <div>
        <label htmlFor="tof" className="block mb-1">
          True or False
          <input
            type="radio"
            name="quizType"
            id="tof"
            value="tof"
            className="ml-2"
            onChange={handleChoiceChange}
          />
        </label>
      </div>

      <div>
        <label htmlFor="qcm" className="block mb-1">
          Multiple Choice (QCM)
          <input
            type="radio"
            name="quizType"
            id="qcm"
            value="qcm"
            className="ml-2"
            onChange={handleChoiceChange}
          />
        </label>
      </div>

      <div>
        <label htmlFor="qcu" className="block mb-1">
          Single Choice (QCU)
          <input
            type="radio"
            name="quizType"
            id="qcu"
            value="qcu"
            className="ml-2"
            onChange={handleChoiceChange}
          />
        </label>
      </div>

      {selectedChoice === 'tof' && <TOFComponent />}
      {selectedChoice === 'qcm' && <QCMComponent />}
      {selectedChoice === 'qcu' && <QCUComponent />}
    </div>
  );
};

export default NewQuiz;
