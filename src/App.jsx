import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import All from "./pages/All";
import Detail from "./pages/Detail";
import Favourite from "./pages/Favourite";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/all" />} />
        <Route path="/all" element={<All />} />
        <Route path="/all/:service/:stop" element={<Detail />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
