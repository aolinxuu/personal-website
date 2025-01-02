import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">Aolin Xu</div>
      <div className="navbar-pages">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/work" activeClassName="active">
          Work
        </NavLink>
        <NavLink to="/contact" activeClassName="active">
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
