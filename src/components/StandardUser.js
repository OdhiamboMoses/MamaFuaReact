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
  const [location, setLocation] = useState("");
  const [balance, setBalance] = useState("0");
  const [email, setEmail] = useState("");
  const [support, setSupport] = useState({});

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"));
    if (!username) {
      navigate("/login");
    } else {
      setName(username);
      axios
        .get("http://localhost:8000/users")
        .then((res) => {
          const user = res.data.find(
            (user) => user.username === username.username
          );
          if (user) {
            setBalance(user.balance || "0");
            setLocation(user.location || "");
            setEmail(user.email || "");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [navigate]);

  function handleUpdate(e) {
    e.preventDefault();
    if (email) {
      const username = uname;
      axios
        .get(`http://localhost:8000/users/${username.username}`)
        .then((res) => {
          const user = res.data.find((user) => user.username === username);
          if (user) {
            axios.patch(`http://localhost:8000/users/${username}`, {
              email: email,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

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

  function handleAcceptJob(job) {
    const username = JSON.parse(localStorage.getItem("username"));
    axios
      .post("http://localhost:8000/userjobs", {
        ...job,
        username: username.username,
      })
      .then(() => {
        setPending([...pending, { ...job, job }]);
      })
      .catch((error) => {
        console.error("There was an error accepting the job!", error);
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
            <button onClick={() => handleAcceptJob(job)}>
              Accept Job Request
            </button>
          </div>
        ))}
      </>
    );
    setDisplay(<Jobs />);
  }

  function handleAsideHide() {
    const asideDiv = document.getElementById("aside-toggle");
    const asideDisplay = document.getElementById("aside-container");

    asideDiv.addEventListener("click", function () {
      if (asideDisplay.style.left === "-250px") {
        asideDisplay.style.left = "0";
      } else {
        asideDisplay.style.left = "-250px";
      }
    });
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
              <h2>{job.name}</h2>
              <p>{job.location}</p>
              <p>{job.type}</p>
              <p>{job.date}</p>
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
        <div>
          <table id="notification-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
            </tbody>

            <tfoot></tfoot>
          </table>
        </div>
      </>
    );
    setDisplay(<Notifications />);
  }

  function supportRequest(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/support", support)
      .then((result) => {})
      .catch((err) => console.log(err));
  }

  function handleSupport() {
    const Support = () => (
      <>
        <h1>Admin Support</h1>
        {
          /* Add your support rendering logic here */
          <div className="form-body">
            <div className="left"></div>
            <form id="support-form" onSubmit={supportRequest}>
              <h2>Support Form</h2>
              <label>Enter Email</label>
              <input
                type="email"
                id="email"
                onChange={(event) =>
                  setSupport({ ...support, email: event.target.value })
                }
              />

              <label>Support Subject</label>
              <textarea
                rows="5"
                cols="6"
                id="home-message"
                onChange={(event) =>
                  setSupport({ ...support, message: event.target.value })
                }
              ></textarea>

              <button className="btn">Send Message</button>
            </form>
          </div>
        }
      </>
    );
    setDisplay(<Support />);
  }

  function handleProfile() {
    const Profile = () => (
      <>
        <h1>Accout Details</h1>
        {/* Add your profile rendering logic here */}
        <div className="acc-details">
          <label>Your First Name :</label>
          <input type="text" value={uname.fname} />
          <label>Your Last Name :</label>
          <input type="text" value={uname.lname} />
          <label>Your Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) =>
              setEmail({ ...email, email: event.target.value })
            }
          />
          <label>Location :</label>
          <input type="text" value={location} />
          <label>Account Balance :</label>
          <input type="text" value={`Ksh. ${balance}`} disabled />
          <button className="btn">Withdraw Cash</button> <br />
          <button className="btn btn-success" onClick={handleUpdate}>
            Update Details
          </button>
        </div>
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
        <aside id="aside-container" className="disableSelection">
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

          <div
            className="aside-toggle"
            id="aside-toggle"
            onClick={handleAsideHide}
          >
            <p>|||</p>
          </div>
        </aside>

        <div id="display">
          <div className="dash-title">
            <h2>{uname ? uname.fname + " " + uname.lname : ""} Dashboard</h2>
          </div>

          <div className="dash-body" id="dash-body">
            {display ? (
              display
            ) : (
              <>
                <div className="welcome">
                  <p>
                    Welcome, {uname.fname} <br /> Mama Fua App ensures a high
                    standard of cleaning by connecting apartments with vetted
                    and experienced cleaners, offering a trusted solution for
                    maintaining clean and comfortable living spaces.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default StandardUser;
