import React, { useState, useEffect } from "react";
import "./Standarduser.css";
import Navbarauth from "./Navbarauth";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

const StandardUser = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobDisplay();
  }, []);

  function jobDisplay() {
    axios.get("http://localhost:8000/jobs").then((result) => {
      setJobs(result.data);
    });
  }

  const [display, setDisplay] = useState([]);
  function handleJobDisplay() {
    function Jobs() {
      return (
        <>
          <h1>Available Jobs</h1>
          {jobs.map((job, index) => (
            <div key={index} className="job-container">
              <div className="jobList">
                <ol>
                  <li>{index + 1}</li>
                </ol>
                <h2>{job.name}</h2>
                <p>{job.location}</p>
                <p>{job.type}</p>
              </div>
              <button>Accept Job Request</button>
            </div>
          ))}
        </>
      );
    }
    setDisplay(Jobs);
  }

  function handlePending() {
    function Pending() {
      return (
        <>
          <h1>Pending Jobs</h1>
          {}
        </>
      );
    }
    setDisplay(Pending);
  }

  function handleNotifications() {
    function Notifications() {
      return (
        <>
          <h1>Your Notifications</h1>
          {}
        </>
      );
    }
    setDisplay(Notifications);
  }

  function handleSupport() {
    function Support() {
      return (
        <>
          <h1>Admin Support</h1>
          {}
        </>
      );
    }
    setDisplay(Support);
  }

  function handleProfile() {
    function Profile() {
      return (
        <>
          <h1>Your Profile</h1>
          {}
        </>
      );
    }
    setDisplay(Profile);
  }

  function handleDash() {
    function Dashboard() {
      return (
        <>
          <h1>Your Dashboard</h1>
          {}
        </>
      );
    }
    setDisplay(Dashboard);
  }

  return (
    <>
      <Navbarauth />
      <main id="ui-layout">
        <aside>
          <div className="dash-links">
            <button onClick={handleDash}>Dashboard</button>
            <button onClick={handleJobDisplay}>
              <Link>Jobs</Link>
            </button>
            <button onClick={handlePending}>
              <Link>Pending</Link>
            </button>
            <button onClick={handleNotifications}>
              <Link>Notifications</Link>
            </button>
            <button onClick={handleSupport}>
              <Link>Support</Link>
            </button>
            <button onClick={handleProfile}>
              <Link>Profile</Link>
            </button>
          </div>

          <div class="aside-toggle">
            <p>|||</p>
          </div>
        </aside>

        <div id="display">
          <div className="dash-title">
            <h2>Standard User Dashboard</h2>
          </div>

          <div className="dash-body" id="dash-body">
            {display}
          </div>
        </div>
      </main>
    </>
  );
};

export default StandardUser;
