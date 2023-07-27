import React from "react";

// Admin Imports
// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  FiMessageSquare,
  MdLock,
} from "react-icons/md";
import UsersProgress from "views/admin/UsersProgress";
import Courses from "views/admin/Courses";
import Dashboard from "views/admin/MainDashboard";
import Quiz from "views/user/quiz";
import CourseOverview from "views/admin/CourseOverview/CourseOverview";

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
    name: "Home",
    layout: "/user",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <Courses />,
  },
  {
    name: "course overiew",
    layout: "/user",
    path: "course/1",
    component: <CourseOverview />,
  },

  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "quiz",
    layout: "/quiz",
    path: "quiz",
    icon: <MdLock className="h-6 w-6" />,
    component: <Quiz />,
  },
];
export default routes;
