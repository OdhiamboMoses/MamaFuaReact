import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleXmark,
  faSquareCaretDown,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  function handleClose() {
    const nav = document.getElementById("menu-container");
    nav.style.display = "none";
  }

  function handleNavDisplay() {
    const nav = document.getElementById("menu-container");
    nav.style.display = "none";
    if (nav.style.display === "block") {
      nav.style.display = "none";
    } else {
      nav.style.display = "block";
      nav.classList.add("anim");
    }
  }
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Mama Fua App</h1>
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/signup">SIGN-UP</Link>
          </li>
          <li>
            <Link to="/gallery">GALLERY</Link>
          </li>
        </ul>
      </div>
      <div id="ham-icon-container">
        <li id="menu-icon">
          <a href="#">
            <FontAwesomeIcon icon={faBars} onClick={handleNavDisplay} />
          </a>
        </li>
      </div>
      <div id="menu-container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={handleClose}
          id="close-btn"
        />
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/signup">SIGN-UP</Link>
          </li>
          <li>
            <Link to="/gallery">GALLERY</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
