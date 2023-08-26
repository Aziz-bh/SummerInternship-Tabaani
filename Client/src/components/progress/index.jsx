import React from "react";

const Progress = (props) => {
  const { value, color = "yellow", width } = props;

  return (
    <div
      className={`h-2 ${
        width ? width : "w-full"
      } rounded-full bg-gray-200 dark:bg-navy-700`}
    >
      <div
        className={`flex h-full items-center justify-center rounded-full ${
          color === "red"
            ? "bg-red-500 dark:bg-red-400"
            : color === "blue"
            ? "bg-blue-500 dark:bg-blue-400"
            : "bg-orange-400 dark:bg-orange-300"
        }`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;
