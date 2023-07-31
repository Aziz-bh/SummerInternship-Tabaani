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
import Courses from "views/user/Courses";
import CourseOverview from "views/user/CourseOverview/CourseOverview";
import QuizPage from "views/user/quizzPage/QuizPage";
import Settings from "views/user/SettingsPage/Settings";
import LandingPage from "views/LandingPage/LandingPage";

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
    path: "course/1",
    component: <CourseOverview />,
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
