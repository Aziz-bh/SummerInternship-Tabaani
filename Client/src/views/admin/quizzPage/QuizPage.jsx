import ChaptersCard from "components/card/ChaptersCard";
import React from "react";
import Quiz from "./components/Quiz";

const QuizPage = () => {
  return (
    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-12">
      {/* Left Section (Small - 4 columns on medium and larger screens) */}
      <div className="md:col-span-12 lg:col-span-4">
        {/* Content for the left section goes here */}
        <ChaptersCard />
      </div>

      {/* Right Section (Big - 8 columns on medium and larger screens) */}
      <div className="md:col-span-12 lg:col-span-8">
        {/* Content for the right section goes here */}
        <Quiz />
      </div>
    </div>
  );
};

export default QuizPage;
