import React from "react";
import Home from "./components/Home";
import NewCourses from "./components/NewCourses";
import BestHosts from "./components/BestHosts";
import YourCourses from "./components/YourCourses";
import Newsletter from "./components/Newsletter";

const LandingPage = () => {
  return (
    <div>
      <Home />
      <NewCourses />
      <BestHosts />
      <YourCourses />
      <Newsletter />
    </div>
  );
};

export default LandingPage;
