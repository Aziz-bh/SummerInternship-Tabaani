// Content.js
import React from "react";
import TrueFalseQuestion from "./TrueFalseQuestion";
import QCM from "./QCM";
import QCU from "./QCU";

const Content = ({ generaltext, quiz,onSubmitAnswer }) => {
  const { question, option1, option2, option3, option4, type } = quiz;

  return (
    <div>
      <div className="general-text-container">
        <p className="general-text">{generaltext}</p>
        <img
          className="online-test-pana"
          alt="Online test pana"
          src="https://generation-sessions.s3.amazonaws.com/eedda6429764b025e8379445d48767ce/img/online-test-pana@2x.png"
        />
      </div>
      <div className="horizontal-line"> </div>
    
      {type === 0 ? (
  <TrueFalseQuestion question={question} onSubmitAnswer={onSubmitAnswer} />
) : type === 1 ? (
  <QCU quiz={quiz} onSubmitAnswer={onSubmitAnswer} />
) : (
  <QCM quiz={quiz} onSubmitAnswer={onSubmitAnswer} />
)}

     
    </div>
  );
};

export default Content;
