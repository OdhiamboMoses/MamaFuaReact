import React, { useState } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bg2 from "./images/bg2.avif";
import bg1 from "./images/bg1.avif";
import {
  faMessage,
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";

function Home() {
  function slide() {
    const homeBg = document.getElementById("home");
    homeBg.style.backgroundImage = `url(${bg2})`;
  }

  function slideR() {
    const homeBg = document.getElementById("home");
    homeBg.style.backgroundImage = `url(${bg1}`;
  }

  function handleMessage() {
    const messageWindow = document.getElementById("message");
    messageWindow.style.display = "block";
  }

  function handleMClose() {
    const dis = document.getElementById("message");
    dis.style.display = "none";
  }

  function handleSendMeso() {
    const meso = document.getElementById("meso");
    const sms = meso.value;
    const mBody = document.getElementById("message-body");
    if (sms !== "") {
      const card = document.createElement("div");
      card.textContent = sms;
      card.classList.add("card");
      mBody.appendChild(card);
      meso.value = "";
    }
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
          <div id="chatBtn" onClick={handleMessage}>
            <i>
              <FontAwesomeIcon icon={faMessage} />
            </i>
          </div>
          <div id="message">
            <div className="message-title">
              <p>Message</p>
              <button onClick={handleMClose}>X</button>
            </div>
            <div id="message-body"></div>
            <div className="message-footer">
              <input type="text" id="meso" placeholder="Enter Message..." />
              <button onClick={handleSendMeso}>Send</button>
            </div>
          </div>
        </div>
        <div className="bg-btn">
          <i className="bigger" id="next" onClick={slide}>
            <FontAwesomeIcon icon={faCaretRight} />
          </i>
          <i className="bigger" id="prev">
            <FontAwesomeIcon icon={faCaretLeft} onClick={slideR} />
          </i>
        </div>
      </div>
    </>
  );
}

export default Home;
