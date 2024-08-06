import React from "react";
import "./About.css";
import cleanup from "./images/cleanup.png";
import Navbar from "./Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div id="about">
        <div className="left">
          <h3>About</h3>
          <p>
            Mama Fua App is an innovative application designed to seamlessly
            connect apartment owners and tenants with professional cleaners. The
            app aims to provide a reliable, safe, and convenient cleaning
            service tailored to the needs of urban dwellers. Mama Fua App
            ensures a high standard of cleaning by connecting users with vetted
            and experienced cleaners, offering a trusted solution for
            maintaining clean and comfortable living spaces.
          </p>
        </div>
        <div className="right">
          <img src={cleanup} alt="a lady carrying cleaning tools" />
        </div>
      </div>
    </>
  );
}

export default About;
