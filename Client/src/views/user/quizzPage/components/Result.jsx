import React from "react";
import Success from "./results/success";

const Result = ({ score }) => {
  return (
    <div>
      {score <= 90 && (
        <>
          <h2>Quiz Result</h2>
          <p>Your score: {score}</p>
        </>
      )}
      {score > 90 ? <Success message="Congratulations on your high score!" /> : null}
    </div>
  );
};

export default Result;
