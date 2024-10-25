import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/all">ALL</Link>
      <Link to="/favourite">FAVOURITE</Link>
    </div>
  );
};

export default NavBar;
