import React from "react";
import Success from "./results/success";

{/* <p>Your ans:</p>
<ul>
  {ans?.map((answer, index) => (
    <li key={index}>
      <p>Question: {answer.question}</p>
      <p>Result: {answer.message}</p>
    </li>
  ))}
</ul> */}

const Result = ({ score,ans }) => {
  return (
    <div>
      {score <= 90 && (
        <>
          <h2>Quiz Result</h2>
          <p>Your score: {score}</p>

        </>
      )}
      {score > 90 ? <Success result={ans} /> : null}
    </div>
  );
};

export default Result;
