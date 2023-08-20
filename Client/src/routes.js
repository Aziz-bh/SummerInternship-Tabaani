import React from "react";
import SignIn from "views/auth/SignIn";
import {
  MdOutlineShoppingCart,
  MdBarChart,
  MdLock,
  MdDashboard,
  MdSettings,
} from "react-icons/md";
import { HiOutlineCube } from "react-icons/hi";
import Dashboard from "views/admin/MainDashboard";
import UsersProgress from "views/admin/UsersProgress";
import Courses from "views/user/Courses/index.jsx";
import MyCourses from "views/admin/Courses/Courses";
import CourseOverview from "views/user/CourseOverview/CourseOverview";
import CourseOverviewad from "views/admin/CourseOverview/CourseOverviewad";
import QuizPage from "views/user/quizzPage/QuizPage";
import Settings from "views/user/SettingsPage/Settings";
import LandingPage from "views/LandingPage/LandingPage";
import CourseForm from "views/admin/Courses/CourseForm";

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
    name: "Hosts",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "users",
    component: <UsersProgress />,
  },
  {
    name: "Courses",
    layout: "/admin",
    icon: <HiOutlineCube className="h-6 w-6" />,
    path: "Courses",
    component: <MyCourses />,
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
    name: "form",
    layout: "/admin",
    path: "Courses/form",
    component: <CourseForm />,
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
