import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/ui/LoginScreen";
import { RegisterScreen } from "../components/ui/RegisterScreen";

export const AuthRoutes = () => {
  return (
      <div>
        <Routes>
            <Route exact path="/login" element={<LoginScreen />} />

            <Route exact path="/register" element={<RegisterScreen />} />

            <Route path="*" element={<Navigate to="/auth/login" replace={true} />} />
        </Routes>
      </div>
  );
};
