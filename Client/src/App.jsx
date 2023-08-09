import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingLayout from "layouts/LandingPage";
import UserLayout from "layouts/user";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import Courses from "views/admin/Courses/Courses";

const App = () => {
  return (
    <Routes>
      <Route path="home/*" element={<LandingLayout />} />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="/*" element={<UserLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    

    </Routes>
  );
};

export default App;
