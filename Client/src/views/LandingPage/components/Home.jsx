import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import wallpaperTablet from "../../../assets/img/wallpaperTablet.png";
import wallpaperImage from "../../../assets/img/wallpaperImage.png";

const Home = () => {
  return (
    <section id="home">
      {/* Background Image with Reduced Opacity */}
      <div
        style={{
          backgroundImage: `url(${wallpaperImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundAttachment: "sticky",
          backgroundSize: "auto",
          opacity: 0.15,
          position: "fixed",
          top: 80,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />

      <meta name="description" />
      <div className=" bg-black flex h-full flex-col items-center  px-20 py-10 md:flex-row ">
        <div className="overflow-hidden bg-cover sm:hidden md:hidden lg:block lg:h-screen lg:w-1/2 ">
          <img
            className="hidden h-full w-full object-cover sm:block"
            src={wallpaperTablet}
            alt="Blurred"
          />
        </div>

        <div className="mt-48 flex flex-col items-center px-8 text-center sm:flex sm:flex-col sm:items-center sm:px-11 sm:text-center md:flex md:flex-col md:items-center md:px-11 lg:mt-0 lg:block lg:w-1/2 lg:px-24 lg:text-left">
          <h2 className="text-black mb-2 text-5xl font-bold ">Hello Friends</h2>
          <p className="text-black mb-6 text-[40px] font-bold">
            We are Tabaani Academy And We want To Start A HOSTING Course
            Together. <br />
            Do you like it too 😍 ?
          </p>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-start gap-2 rounded-[10px] bg-[#000000] py-4 pl-4 pr-2 text-center text-sm font-medium capitalize leading-tight text-white">
              Start Course Now
              <MdOutlineKeyboardArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
