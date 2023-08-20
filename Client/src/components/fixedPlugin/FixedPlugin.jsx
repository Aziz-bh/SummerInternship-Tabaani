import React from "react";

import { RiMoonFill, RiSunFill } from "react-icons/ri";
export default function FixedPlugin(props) {
  const { ...rest } = props;
  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains("dark")
  );

  return (
    <button
      className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-yellow-500 bg-yellow-500 bg-gradient-to-br p-0"
      onClick={() => {
        if (darkmode) {
          document.body.classList.remove("dark");
          setDarkmode(false);
        } else {
          document.body.classList.add("dark");
          setDarkmode(true);
        }
      }}
      {...rest}
    >
      <div className="cursor-pointer text-gray-600">
        {darkmode ? (
          <RiSunFill className="h-4 w-4 text-white" />
        ) : (
          <RiMoonFill className="h-4 w-4 text-white" />
        )}
      </div>
    </button>
  );
}
