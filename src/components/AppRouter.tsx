import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import NavBar from "./NavBar";

const AppRouter = () => {
  return (
    <div>
    <NavBar/>
    <Routes>
        <Route element={<MainPage />} path="/"></Route>
    </Routes>
    </div>
  );
};

export default AppRouter;
