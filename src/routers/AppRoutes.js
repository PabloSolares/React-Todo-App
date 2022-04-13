import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodoScreen } from "../components/todos/TodoScreen";
import { LoginScreen } from "../components/ui/LoginScreen";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "./../actions/auth";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { LoadingScreen } from "./../components/ui/LoadingScreen";
import { getAuth } from "firebase/auth";
import { app, db } from "../firebase/firebaseConfig";
import { loadTodo } from "../helpers/LoadTodo";
import { refreshTodo, setTodos } from "../actions/todos";

export const AppRoutes = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(app);
  // console.log(db);
  useEffect(() => {
    const auth = getAuth();

    auth.onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        
        path="/auth/*"
        element={
          <PublicRoutes logged={isLoggedIn}>
            <AuthRoutes />
          </PublicRoutes>
        }
      />

      <Route
        
        path="/"
        element={
          <PrivateRoutes logged={isLoggedIn} check={checking}>
            <TodoScreen />
          </PrivateRoutes>
        }
      />
      <Route path="*" element={<LoginScreen />} />
    </Routes>
  );
};
