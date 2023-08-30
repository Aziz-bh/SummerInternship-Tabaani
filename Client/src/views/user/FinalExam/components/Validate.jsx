import React from 'react';
import succeeded from "../../../../assets/img/results/succeeded.png"
const Validate = () => {
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
              Well done !
            </h1>
            <h1 className="thats-right-great  pb-3 text-3xl font-normal">
            Congratulations on Excelling in Your Exam Endeavor
            </h1>
            </div>

          </div>
          </div>
          <div className="flex flex-col">
          <div className="w-full flex justify-center ">
            <img className="fail ml-5 w-[25rem] h-80 mt-5" alt="succeeded" src={succeeded} />
            </div>
            <div className="w-full h-full mb-5 ">
              <p
                className="my-8 lorem-ipsum-dolor text-lg font-bold tracking-wide text-gray-1100 h-full"
                style={{ fontWeight: 1000 }}
              >
KEEP PUSHING FORWARD, YOU'RE ALMOST THERE. LEARNING TAKES EFFORT AND PERSISTENCE. EMBRACE MISTAKES AS STEPPING STONES TOWARD SUCCESS. SUCCESS IS BUILT UPON A FOUNDATION OF LEARNING FROM FAILURES. YOU'RE CAPABLE OF MORE THAN YOU THINK. STAY DETERMINED AND YOU'LL CONQUER CHALLENGES.              </p>
            </div>
            <div className="flex items-center justify-center mb-20">
            <button
                className="lesson-complete rounded-lg border border-gray-1200 px-10  text-lg font-medium tracking-wide bg-blackTheme text-white py-3 "
              onClick={()=>{window.location.replace("/dashboard");}}
              >
               Home Page
              </button>
              </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default Validate;
