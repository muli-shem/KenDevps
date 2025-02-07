import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import "../sytles/Navbar.scss"; // Ensure the path is correct

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          AfriVoice Hub
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/leaders" onClick={() => setMenuOpen(false)}>
              Leaders
            </Link>
          </li>
          <li>
            <Link to="/reports" onClick={() => setMenuOpen(false)}>
              Reports
            </Link>
          </li>
          <li>
            <Link to="/constitution" onClick={() => setMenuOpen(false)}>
              Constitution
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/community" onClick={() => setMenuOpen(false)}>
              Community
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>
        </ul>

        {/* Profile Icon */}
        <div className="profile-icon">
          <FaUserCircle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;