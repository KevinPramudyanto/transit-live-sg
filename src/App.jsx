import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import All from "./pages/All";
import Favourite from "./pages/Favourite";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/all" />} />
        <Route path="/all" element={<All />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </>
  );
};

export default App;
