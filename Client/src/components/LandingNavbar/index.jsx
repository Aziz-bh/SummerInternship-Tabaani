import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import TabaaniAcademyLogo from "../../assets/img/Logos/TabaaniAcademyLogo.png";
import { Link } from "react-scroll";

const LandingNavBar = () => {
  const [nav, setNav] = useState(false);

  const handleLinkClick = () => {
    // Close the mobile nav after a link is clicked
    if (nav) {
      setNav(false);
    }
  };

  return (
    <div className="border-zinc-500 fixed z-10 flex h-20 w-full items-center justify-between border-b bg-white px-4 text-white lg:px-20">
      <div className="flex items-center gap-8">
        <div className="flex items-end gap-1">
          <h1 className=" text-3xl font-bold text-[#FFAF20]">Tabaani</h1>
          <h1 className=" text-2xl font-bold text-[#000000]">ACADEMY</h1>
        </div>
        <ul className="hidden md:flex">
          <li className="cursor-pointer px-4 font-medium capitalize text-gray-500 duration-200 hover:scale-105">
            <Link to="home" smooth duration={500}>
              Home
            </Link>
          </li>
          <li className="cursor-pointer px-4 font-medium capitalize text-gray-500 duration-200 hover:scale-105">
            <Link to="about" smooth duration={500}>
              About
            </Link>
          </li>
          <li className="cursor-pointer px-4 font-medium capitalize text-gray-500 duration-200 hover:scale-105">
            <Link to="contact" smooth duration={500}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="hidden gap-4 md:flex">
        <button className="cursor-pointer font-medium capitalize text-gray-500 duration-200 hover:scale-105 hover:text-orange-500">
          <a>Login</a>
        </button>

        <button className=" rounded-3xl bg-orange-400 px-4 py-2 font-medium text-[#000000] duration-200 hover:scale-105">
          Sign up
        </button>
      </div>

      <div
        onClick={() => setNav(!nav)}
        className="z-10 cursor-pointer pr-4 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center bg-white  text-gray-500">
          <li className="cursor-pointer px-4 py-6 text-4xl capitalize">
            <Link onClick={handleLinkClick} to="home" smooth duration={500}>
              Home
            </Link>
          </li>
          <li className="cursor-pointer px-4 py-6 text-4xl capitalize">
            <Link onClick={handleLinkClick} to="about" smooth duration={500}>
              About
            </Link>
          </li>
          <li className="cursor-pointer px-4 py-6 text-4xl capitalize">
            <Link onClick={handleLinkClick} to="contact" smooth duration={500}>
              Contact
            </Link>
          </li>
          <li className="cursor-pointer px-4 py-6 text-4xl capitalize">
            <Link onClick={handleLinkClick} to="signup" smooth duration={500}>
              Sign up
            </Link>
          </li>
          <li className="cursor-pointer px-4 py-6 text-4xl capitalize">
            <Link onClick={handleLinkClick} to="login" smooth duration={500}>
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LandingNavBar;
