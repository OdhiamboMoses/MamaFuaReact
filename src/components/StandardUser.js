import React, { useState, useEffect } from "react";
import "./Standarduser.css";
import Navbarauth from "./Navbarauth";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const StandardUser = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [uname, setName] = useState([]);
  const [display, setDisplay] = useState(null);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"));
    if (!username) {
      navigate("/login");
    } else {
      setName(username);
    }
  }, [navigate]);

  useEffect(() => {
    jobDisplay();
  }, []);

  useEffect(() => {
    pendingDisplay();
  }, [uname]);

  function jobDisplay() {
    axios.get("http://localhost:8000/jobs").then((result) => {
      setJobs(result.data);
    });
  }

  function pendingDisplay() {
    const username = JSON.parse(localStorage.getItem("username"));
    axios.get("http://localhost:8000/userjobs").then((result) => {
      const userPendingJobs = result.data.filter(
        (job) => job.username === username.username
      );
      setPending(userPendingJobs);
    });
  }

  function handleJobDisplay() {
    const Jobs = () => (
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
    setDisplay(<Jobs />);
  }

  function handlePending() {
    const Pending = () => (
      <>
        <h1>Pending Jobs</h1>
        {pending.map((job, index) => (
          <div key={index} className="job-container">
            <div className="jobList">
              <ol>
                <li>{index + 1}</li>
              </ol>
              <h2>{job.username}</h2>
              <p>{job.location}</p>
              <p>{job.jobPicked}</p>
              <p>{job.deadline}</p>
            </div>
            <button>Mark as Done</button>
          </div>
        ))}
      </>
    );
    setDisplay(<Pending />);
  }

  function handleNotifications() {
    const Notifications = () => (
      <>
        <h1>Your Notifications</h1>
        {/* Add your notification rendering logic here */}
      </>
    );
    setDisplay(<Notifications />);
  }

  function handleSupport() {
    const Support = () => (
      <>
        <h1>Admin Support</h1>
        {/* Add your support rendering logic here */}
      </>
    );
    setDisplay(<Support />);
  }

  function handleProfile() {
    const Profile = () => (
      <>
        <h1>Your Profile</h1>
        {/* Add your profile rendering logic here */}
      </>
    );
    setDisplay(<Profile />);
  }

  function handleDash() {
    const Dashboard = () => (
      <>
        <h1> Dashboard</h1>
      </>
    );
    setDisplay(<Dashboard />);
  }

  function handleSignOut() {
    // Clear user session from localStorage
    localStorage.removeItem("username");
    // Navigate back to login page
    navigate("/login");
  }

  return (
    <>
      <Navbarauth />
      <main id="ui-layout">
        <aside>
          <div className="dash-links">
            <button onClick={handleDash}>Dashboard</button>
            <button onClick={handleJobDisplay} id="jobs">
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
            <button onClick={handleSignOut}>
              <Link>Sign-Out</Link>
            </button>
            <div id="prof-pic">{uname ? uname.username : ""}</div>
          </div>

          <div className="aside-toggle">
            <p>|||</p>
          </div>
        </aside>

        <div id="display">
          <div className="dash-title">
            <h2>{uname ? uname.fname + " " + uname.lname : ""} Dashboard</h2>
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
