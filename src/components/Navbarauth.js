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

  function handleAsideDisplay() {
    const sideNav = document.getElementById("aside-container");
    console.log(sideNav);
    if (sideNav.style.display === "none") {
      sideNav.style.display = "block";
    } else {
      sideNav.style.display = "none";
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
            <Link to="/login">SIGN-OUT</Link>
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
            <p onClick={handleAsideDisplay}>Navigation</p>
          </li>
          <li>
            <Link to="/login">SIGN-OUT</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbarauth;
