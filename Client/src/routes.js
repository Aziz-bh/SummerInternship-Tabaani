import React from "react";
import SignIn from "./views/auth/SignIn";
import {
  MdOutlineShoppingCart,
  MdBarChart,
  MdLock,
  MdDashboard,
  MdSettings,
} from "react-icons/md";
import { FaCertificate } from "react-icons/fa";

import { HiOutlineCube } from "react-icons/hi";
import Dashboard from "./views/admin/MainDashboard";
import UsersProgress from "./views/admin/UsersProgress";
import Courses from "./views/user/Courses/index.jsx";
import MyCourses from "./views/admin/Courses/Courses";
import CourseOverview from "./views/user/CourseOverview/CourseOverview";
import CourseOverviewad from "./views/admin/CourseOverview/CourseOverviewad";
import QuizPage from "./views/user/quizzPage/QuizPage";
import Certificates from "./views/user/CertificatePage/Certificate";
import LandingPage from "./views/LandingPage/LandingPage";
import CourseForm from "./views/admin/Courses/CourseForm";
import SignUp from "views/auth/SignUp";
import NewQuiz from "views/admin/quiz";
import Validate from "views/user/FinalExam/components/Validate";


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
    hideInSidebar: true,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
    hideInSidebar: true,
  },
  //the user dashboard
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
    name: "Certificates",
    layout: "/user",
    path: "certificates",
    icon: <FaCertificate className="h-6 w-6" />,
    component: <Certificates />,
  },
  {
    name: "landing",
    layout: "/home",
    path: "home",
    component: <LandingPage />,
  },

    {
    name: "Exam",
    layout: "/user",
    path: "Exam",
    icon: <MdLock className="h-6 w-6" />,
    component: <Validate />,
    hideInSidebar: true,
  },
  {
    name: "quiz",
    layout: "/admin",
    path: "quizzes/:lessonId",
    icon: <MdLock className="h-6 w-6" />,
    component: <NewQuiz />,
    hideInSidebar: true,
  },
];

export default routes;
