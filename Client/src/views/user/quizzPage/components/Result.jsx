import React from "react";
import Success from "./results/success";
import Fail from "./results/fail";

const Result = ({ score, ans }) => {
  return (
    <div>
      {score == null &&(
<>
<h2>Quiz Result</h2>
          <p>In Progress {score}</p>
</>
      )}
      {score != null && (
        <>

          {score >= 90 ? <Success result={ans} /> : <Fail result={ans} />}
        </>
      )}
    </div>
  );
};

export default Result;

