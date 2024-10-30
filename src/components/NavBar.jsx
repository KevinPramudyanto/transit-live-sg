import React from "react";
import { Link, NavLink } from "react-router-dom";
import bus from "../assets/bus.png";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <Link className="logo" to="/all" title="TransitLive Home">
        <img src={bus} alt="logo" />
        <div>TransitLive SG</div>
      </Link>
      <div className="navbar">
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "notActive")}
          to="/all"
        >
          Main
        </NavLink>
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "notActive")}
          to="/bookmarks"
        >
          Bookmarks
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
