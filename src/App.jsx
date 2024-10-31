import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import All from "./pages/All";
import Detail from "./pages/Detail";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/all" />} />
        <Route path="/all" element={<All />} />
        <Route path="/all/:mode/:service/:stop" element={<Detail />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
