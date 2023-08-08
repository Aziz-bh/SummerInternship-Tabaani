import React from "react";

// Admin Imports
// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdOutlineShoppingCart,
  MdBarChart,
  MdLock,
  MdDashboard,
  MdSettings,
} from "react-icons/md";
import Dashboard from "views/admin/MainDashboard";
import UsersProgress from "views/admin/UsersProgress";
import Courses from "views/admin/Courses/Courses";
import CourseOverview from "views/user/CourseOverview/CourseOverview";
import CourseOverviewad from "views/admin/CourseOverview/CourseOverviewad";
import QuizPage from "views/user/quizzPage/QuizPage";
import Settings from "views/user/SettingsPage/Settings";
import LandingPage from "views/LandingPage/LandingPage";

const courseOverviewRoute = {
  // Create a separate variable for Course Overview
  name: "course overiew",
  layout: "/user",
  path: "course/:id",
  component: <CourseOverview />,
};

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Dashboard />,
    secondary: true,
  },
  
 
  {
    name: "Messages",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "users",
    component: <UsersProgress />,
  },
  {
    name: "Courses",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "Courses",
    component: <Courses />,
  },
 
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },

  {
    name: "Home",
    layout: "/user",
    path: "dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <Courses />,
  },
  {
    name: "course overiew",
    layout: "/user",
    path: "course/:id",
    component: <CourseOverview />,
    hideInSidebar: true,
  },
  {
    name: "course overiewad",
    layout: "/admin",
    path: "Courses/coursead/:id",
    component: <CourseOverviewad />,
    hideInSidebar: true,
  },
  {
    name: "Settings",
    layout: "/user",
    path: "settings",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Settings />,
  },
  {
    name: "landing",
    layout: "/home",
    path: "home",
    component: <LandingPage />,
  },
  {
    name: "quiz",
    layout: "/user",
    path: "quiz",
    icon: <MdLock className="h-6 w-6" />,
    component: <QuizPage />,
  },
];

export default routes;
