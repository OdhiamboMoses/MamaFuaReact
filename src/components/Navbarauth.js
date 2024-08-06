import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleXmark,
  faSquareCaretDown,
} from "@fortawesome/free-solid-svg-icons";

const Navbarauth = () => {
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
            <Link to="/standardUser">HOME</Link>
          </li>
          <li>
            <Link to="">JOBS</Link>
          </li>

          <li>
            <Link to="/">SIGN-OUT</Link>
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
            <Link to="/standardUser">HOME</Link>
          </li>
          <li>
            <Link to="/jobs">JOBS</Link>
          </li>
          <li>
            <Link to="/">SIGN-OUT</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbarauth;
