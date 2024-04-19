import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file for Navbar styling

const Navbar = () => {
  return (
    <div>
      <ul className="navbar-list">
        <li>
          <NavLink to="/" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active-link">
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/validation" activeClassName="active-link">
            Validation
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active-link">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
