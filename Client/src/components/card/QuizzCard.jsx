import React, { useState } from "react";
import { useEffect } from "react";

const QuizzCard = ({ question, option1, option2, option3, option4 }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Fetch data from the API
  useEffect(() => {
    fetch("http://localhost:5000/api/quizzes/chapter/MXIZbeJX2hjjEX9oQuNF")
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="shadow- rounded-2xl bg-white p-4 shadow-lg">
      <div>
        <p className="mb-2 text-2xl font-semibold">check your knowlege</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg  p-4 text-xl">
        <div className="w-5/6 rounded-lg  p-4">
          <p className="mb-8 text-center text-2xl">{question}</p>
          <div className="flex flex-col justify-between gap-4">
            {/*choice1*/}
            <div className=" flex items-center justify-between">
              <span className="font-lg ml-3 text-xl">{option1}</span>

              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>

            {/*choice2*/}

            <div className=" flex items-center justify-between">
              <span className="font-lg ml-3 text-xl">{option2}</span>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  value={option2}
                  className="peer sr-only"
                  checked={selectedOption === option2}
                  onChange={handleOptionChange}
                />{" "}
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>

            {/*choice1*/}
            <div className=" flex items-center justify-between">
              <span className="font-lg ml-3 text-xl">{option3}</span>

              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>

            {/*choice2*/}
            <div className=" flex items-center justify-between">
              <span className="font-lg ml-3 text-xl">{option4}</span>

              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>

            {/*choice2*/}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button className="border-zinc-100 mt-4  inline-flex  items-center justify-start gap-3 rounded-[10px] border py-4  pl-6 pr-6 text-center text-sm font-medium capitalize leading-tight ">
          Skip To the Test
        </button>
        <button
          className="mt-4 flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-4 pl-6 pr-6 text-center text-sm font-medium capitalize leading-tight text-white"
          onClick={handleNextPage}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizzCard;
