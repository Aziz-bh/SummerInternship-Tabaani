import React from "react";

const Result = ({ score }) => {
  return (
    <div>
      <h2>Quiz Result</h2>
      <p>Your score: {score}</p>
      {/* Add content for displaying the result */}
    </div>
  );
};

export default Result;
