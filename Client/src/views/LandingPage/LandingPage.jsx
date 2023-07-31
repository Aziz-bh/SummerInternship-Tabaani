import React from "react";
import Home from "./components/Home";
import NewCourses from "./components/NewCourses";
import BestHosts from "./components/BestHosts";
import YourCourses from "./components/YourCourses";
import Newsletter from "./components/Newsletter";
import TopCourses from "./components/TopCourses";

const LandingPage = () => {
  return (
    <div>
      <Home />
      <NewCourses />
      <BestHosts />
      <YourCourses />
      <Newsletter />
      <TopCourses />
    </div>
  );
};

export default LandingPage;
