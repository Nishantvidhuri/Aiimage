import React from "react";
import logo from "../images/logo.svg";
import "../style/Navbar.css";

const NavBar = ({ onNavClick }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img src={logo} alt="logo" className="logo" />
        </div>

        {/* Centered Name */}
        <div className="navbar-title">GenAI - Image Generator</div>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          <ul className="navbar-links">
            <li>
              <button onClick={() => onNavClick("aigeneration")} className="navbar-link">
                AI Generation
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick("history")} className="navbar-link">
                History
              </button>
            </li>
           
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
