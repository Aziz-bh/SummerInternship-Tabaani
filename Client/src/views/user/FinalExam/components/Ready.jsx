import React, { useState } from "react";
import ready from "../../../../assets/img/results/Ready.png"
import FinalExam from "..";

const Ready = ({id}) => {
    const [showExamFinal, setShowExamFinal] = useState(false);

    const handleClick = () => {
      setShowExamFinal(true);
    };
    if (showExamFinal) {
        return <FinalExam id={id} />;
      }
  return (
    <div className="mt-4 rounded-lg border bg-white p-4 shadow-md h-full">
      <div className="overlap ml-10">
        <div className="overlap-group">
          <div className="flex flex-col">
            <div className="lesson-complete text-md font-semibold tracking-wide text-gray-1000">
              Nice Work
            </div>
            <div className="flex justify-between">
            <div className="">
            <h1 className="thats-right-great mt-5 pb-2 text-4xl font-normal">
              You Are Ready To Take
            </h1>
            <h1 className="thats-right-great  pb-5 text-4xl font-normal">
              The End Of Module Assessment
            </h1>
            </div>
            <div className="flex items-center justify-center">
            <button
                className="lesson-complete rounded-lg border border-gray-1200 px-8  text-lg font-medium tracking-wide bg-blackTheme text-white py-3 "
                onClick={handleClick} 
              >
                Module Quiz
              </button>
              </div>
          </div>
          </div>
          <div className="flex flex-col">
            <div className="w-full h-full">
              <p
                className="my-8 lorem-ipsum-dolor text-lg font-bold tracking-wide text-gray-1100 h-full"
                style={{ fontWeight: 1000 }}
              >
KEEP PUSHING FORWARD, YOU'RE ALMOST THERE. LEARNING TAKES EFFORT AND PERSISTENCE. EMBRACE MISTAKES AS STEPPING STONES TOWARD SUCCESS. SUCCESS IS BUILT UPON A FOUNDATION OF LEARNING FROM FAILURES. YOU'RE CAPABLE OF MORE THAN YOU THINK. STAY DETERMINED AND YOU'LL CONQUER CHALLENGES.              </p>
            </div>
            <div className="w-full flex justify-center mb-20 ">
            <img className="fail ml-5 w-80 h-full mb-20 mt-5" alt="ready" src={ready} />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Ready;
