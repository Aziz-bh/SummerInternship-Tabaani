import React, { useState, useEffect } from "react";
import success from "../../../../../assets/img/results/success.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Success = ({ result }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    
    toast.success("Congratulations! You have completed the lesson successfully.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000, 
      toastStyle: {
        background: "black", 
        color: "white", 
      },
    });
  }, [])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="ml-20 mt-10 mr-10 pl-4">
      <div className="flex items-center justify-center">
        {isModalOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm backdrop-filter">
            <div
              className="tailwind w-2/5 overflow-y-auto rounded bg-white p-4 shadow-lg"
              style={{ maxHeight: "80vh", marginLeft: "20%" }}
            >
              <h2 className="mb-4 items-center justify-center text-xl font-semibold">
                Review The Answers
              </h2>
              <ul>
                {result?.map((answer, index) => (
                  <div
                    className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    key={index}
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Question: {answer.question}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Result: {answer.message}
                    </p>
                  </div>
                ))}
              </ul>
              <button
                onClick={closeModal}
                className="mx-auto mt-4 rounded bg-blackTheme px-20 py-2 text-white hover:bg-blackTheme focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="overlap">
        <div className="overlap-group ">
          <div className="flex flex-col">
            <div className="lesson-complete text-sm font-semibold tracking-wide text-gray-1000">
              Lesson Complete
            </div>

            <h1 className="thats-right-great mt-5 mb-10 pb-5 text-4xl font-normal">
              Thats Right, Great Work
            </h1>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="">
              <p
                className="lorem-ipsum-dolor text-lg font-bold tracking-wide text-gray-1100"
                style={{ fontWeight: 1000 }}
              >
                ACHIEVING SUCCESS QUICKLY HIGHLIGHTS YOUR DEDICATION AND ABILITY
                TO SEIZE OPPORTUNITIES. MAINTAIN THAT ENERGY, STAY CURIOUS, AND
                STRIVE FOR EXCELLENCE. YOUR DETERMINATION WILL CONTINUE TO YIELD
                ACCOMPLISHMENTS. CONGRATULATIONS AND KEEP UP THE FANTASTIC
                EFFORT!
              </p>
              <div className="mt-14 ml-4 pt-4">
                <button
                  onClick={openModal}
                  className="lesson-complete rounded-md border border-gray-1200 px-8 py-3 text-lg font-medium tracking-wide text-gray-1000"
                >
                  Review the Answers
                </button>
              </div>
            </div>
            <img className="success ml-2" alt="Success" src={success} />
          </div>
        </div>
      </div>
      <div className="my-7 border-t border-gray-300"></div>
      <div className="overlap-2 ml-2">
        <div className="next-steps mb-5 text-2xl font-bold">NEXT STEPS</div>
        <div className="flex items-start">
          <div className="flex-1">
            <p className="p w-96 text-lg font-semibold text-gray-1000">
              Lorem Ipsum Dolor Sit Amet Consectetur. Sed Egestas Nisl Fringilla
              Hendrerit Faucibus. Phasellus Dapibus Sed Turpis Nulla Porta
              Gravida. Duis Et In Sodales Arcu Vitae Et.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <button className="mt-24 rounded-xl bg-blackTheme py-3 px-8 pt-4 pb-4 text-sm text-white hover:bg-gray-700">
              Next Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
