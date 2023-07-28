import React from "react";
import UnfinishedCoursesCard from "components/card/UnfinishedCoursesCard";

const Newsletter = () => {
  return (
    <div className="mx-auto bg-[#F6F7FE] py-16  md:px-11 lg:px-24" id="about">
      <div className="flex items-center justify-between pb-8 pr-2">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">
            Find out about the latest courses with the
          </p>
          <p className="flex flex-row gap-1 text-2xl font-bold">
            <div className=" text-blue-700">Academy</div> Newsletter
          </p>
        </div>
        <div className="relative flex items-center">
          <input
            type="text"
            id="default-input"
            placeholder="Email Address..."
            className="bg-white-50 block w-96 rounded-lg border border-gray-300 px-3 py-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-black absolute right-3 top-1/2 -translate-y-1/2 transform rounded-lg bg-[#000000] px-4 py-2 text-sm font-medium text-white"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
