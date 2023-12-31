import React from 'react';
import fail from "../../../../../assets/img/results/fail.png";

const Fail = ({ result }) => {


  return (
    <div className="ml-20 mt-10 mr-10 pl-4">
      <div className="overlap">
        <div className="overlap-group">
          <div className="flex flex-col">
            <div className="lesson-complete text-sm font-semibold tracking-wide text-gray-1000">
              Check Your Knowledge
            </div>
            <h1 className="thats-right-great mt-5 mb-10 pb-5 text-4xl font-normal">
              You're nearly right. have another go
            </h1>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="w-3/6 h-full">
              <p
                className="lorem-ipsum-dolor text-lg font-bold tracking-wide text-gray-1100 h-full"
                style={{ fontWeight: 1000 }}
              >
                LOREM IPSUM DOLOR SIT AMET CONSECTETUR. SED EGESTAS NISL
                FRINGILLA HENDRERIT FAUCIBUS. PHASELLUS DAPIBUS SED TURPIS NULLA
                PORTA GRAVIDA. DUIS ET IN SODALES ARCU VITAE ET. NUNC VELIT
                MAURIS TRISTIQUE AMET IN FAUCIBUS URNA NULLAM SEMPER ID
                PELLENTESQUE.
              </p>
            </div>
            <img className="fail ml-5 w-80 h-full" alt="Fail" src={fail} />
          </div>

          <div className="flex items-center justify-center">
          <div className="mt-16 ml-4 pt-4">
                <button className="lesson-complete rounded-lg border border-gray-1200 px-8 py-3 text-lg font-medium tracking-wide text-gray-1000">
                  Watch Video
                </button>
              </div>
            <div className="mt-16 ml-4 pt-4">
              <button
                className="lesson-complete rounded-lg border border-gray-1200 px-8 py-3 text-lg font-medium tracking-wide bg-blackTheme text-white"
                onClick={()=>window.location.reload()} // Call the handleTryAgain function on button click
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fail;
