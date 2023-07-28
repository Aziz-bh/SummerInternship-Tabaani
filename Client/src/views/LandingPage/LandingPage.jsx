import React from "react";
import Home from "./components/Home";
import NewCourses from "./components/NewCourses";
import BestHosts from "./components/BestHosts";

const LandingPage = () => {
  return (
    <div>
      <Home />
      <NewCourses />
      <BestHosts />
    </div>
  );
};

export default LandingPage;
