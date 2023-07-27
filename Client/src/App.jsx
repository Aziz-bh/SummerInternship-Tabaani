import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "layouts/user";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="/*" element={<UserLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
    </Routes>
  );
};

export default App;
