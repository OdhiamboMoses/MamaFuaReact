import React from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bg2 from "./images/bg2.avif";
import {
  faMessage,
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";

function Home() {
  function slide() {
    const homeBg = document.getElementById("home");
    console.log(homeBg);
  }
  return (
    <>
    <Navbar />
      <div id="home">
        <div id="home-main">
          <h2>
            LINKING APARTMENTS <br />
            WITH
            <span>USAFI</span>
          </h2>
        </div>
        <div className="home-display-footer">
          <div id="chatBtn">
            <i>
              <FontAwesomeIcon icon={faMessage} />
            </i>
          </div>
        </div>
        <div className="bg-btn">
          <i className="bigger" id="next" onClick={slide}>
            <FontAwesomeIcon icon={faCaretRight} />
          </i>
          <i className="bigger" id="prev">
            <FontAwesomeIcon icon={faCaretLeft} onClick={slide} />
          </i>
        </div>
      </div>
    </>
  );
}

export default Home;
