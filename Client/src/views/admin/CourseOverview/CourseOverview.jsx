import LessonCard from "components/card/LessonCard";
import React from "react";

const CourseOverview = () => {
  return (
    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-12">
      {/* Left Section (Small - 4 columns on medium and larger screens) */}
      <div className="bg-blue-200 p-4 md:col-span-12 lg:col-span-4">
        {/* Content for the left section goes here */}
        <p>This is the small section.</p>
      </div>

      {/* Right Section (Big - 8 columns on medium and larger screens) */}
      <div className="bg-green-200 p-4 md:col-span-12 lg:col-span-8">
        {/* Content for the right section goes here */}
        <LessonCard />
      </div>
    </div>
  );
};

export default CourseOverview;
