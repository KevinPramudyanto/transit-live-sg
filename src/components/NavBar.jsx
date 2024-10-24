import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/all">All</Link>
      <Link to="/favourite">Favourite</Link>
    </div>
  );
};

export default NavBar;
