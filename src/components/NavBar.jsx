import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/all">ALL</Link>
      <Link to="/bookmarks">BOOKMARKS</Link>
    </div>
  );
};

export default Navbar;
