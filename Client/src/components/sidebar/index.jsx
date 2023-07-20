/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import TabaaniAcademyLogo from "assets/img/Logos/TabaaniAcademyLogo.png";

import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-[#000000] pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[40px] mt-[50px] flex items-center`}>
        <div className="mt-1 flex items-center space-x-1 font-poppins text-[24px] font-bold uppercase dark:text-white">
          <img src={TabaaniAcademyLogo} alt="Tabaani Academy Logo" />
          <span className="mt-5 font-medium text-white">Academy</span>
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px  dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
