// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./Navbar.css";

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-title">Aolin Xu</div>
//       <div className="navbar-pages">
//         <NavLink exact to="/" activeClassName="active">
//           Home
//         </NavLink>
//         <NavLink to="/work" activeClassName="active">
//           Work
//         </NavLink>
//         <NavLink to="/contact" activeClassName="active">
//           Contact
//         </NavLink>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <Link to="/" className="navbar-logo">
        <span className="navbar-logo-text">Aolin Xu</span>
        <span className="navbar-logo-dot"></span>
      </Link>

      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `navbar-link ${isActive ? "navbar-link--active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/work"
          className={({ isActive }) => `navbar-link ${isActive ? "navbar-link--active" : ""}`}
        >
          Work
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => `navbar-link ${isActive ? "navbar-link--active" : ""}`}
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;