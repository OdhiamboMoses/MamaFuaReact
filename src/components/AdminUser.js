import React, { useState, useEffect } from "react";
import "./AdminUser.css";
import Navbarauth from "./Navbarauth";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const AdminUser = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [uname, setName] = useState([]);
  const [display, setDisplay] = useState(null);
  const [pending, setPending] = useState([]);
  const [location, setLocation] = useState("");
  const [balance, setBalance] = useState("0");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((result) => {
      const owners = result.data.filter(
        (user) => user.accType === "Apartment Owner"
      );
      setOwners(owners);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((result) => {
      const mama = result.data.filter((user) => user.type === "standard");
      setUsers(mama);
    });
  }, []);

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
        <div>
          <table id="notification-table" className="user-table">
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
  function handleUpdate() {
    const updateWindow = document.getElementById("user-update");
    updateWindow.style.display = "block";
  }
  function handleUpdateClose() {
    const updateWindow = document.getElementById("user-update");
    updateWindow.style.display = "none";
  }

  function handleUsers() {
    const Users = () => (
      <>
        <h1>Users</h1>
        <div className="form-body">
          <table className="user-table">
            <thead>
              <tr>
                <td>No</td>
                <td>ID</td>
                <td>FName</td>
                <td>Lname</td>
                <td>Gender</td>
                <td>Location</td>
                <td>Acc Type</td>
                <td>Email</td>
                <td>Update</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr id={index + 1}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.gender}</td>
                  <td>{user.location}</td>
                  <td>{user.accType}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={handleUpdate}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div id="user-update">
            <div className="update-title">
              <h3>Account Update Interface</h3>
              <button onClick={handleUpdateClose}>X</button>
            </div>
            <div className="update-body">
              <form>
                <div>
                  <label htmlFor="fname">First Name</label>
                  <input type="text" name="fname" />
                </div>
                <div>
                  <label htmlFor="lname">Last Name</label>
                  <input type="text" name="lname" />
                </div>
                <div>
                  <label htmlFor="gender">Gender</label>
                  <input type="text" name="gender" />
                </div>
                <div>
                  <label htmlFor="location">Location</label>
                  <input type="text" name="location" />
                </div>
                <div>
                  <label htmlFor="accType">Acc type</label>
                  <input type="text" name="accType" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" />
                </div>
              </form>
            </div>
            <div className="update-footer">
              <button>Update</button>
            </div>
          </div>
        </div>
      </>
    );
    setDisplay(<Users />);
  }

  function handleOwners() {
    const Owners = () => (
      <>
        <h1>Apartments Owners List</h1>
        <div className="form-body">
          <table className="user-table">
            <thead>
              <tr>
                <td>No</td>
                <td>ID</td>
                <td>FName</td>
                <td>Lname</td>
                <td>Gender</td>
                <td>Location</td>
                <td>Acc Type</td>
                <td>Email</td>
                <td>Update</td>
              </tr>
            </thead>
            <tbody>
              {owners.map((user, index) => (
                <tr id={index + 1}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.gender}</td>
                  <td>{user.location}</td>
                  <td>{user.accType}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={handleUpdate}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div id="user-update">
            <div className="update-title">
              <h3>Owners Update Interface</h3>
              <button onClick={handleUpdateClose}>X</button>
            </div>
            <div className="update-body"></div>
            <div className="update-footer">
              <button>Update</button>
            </div>
          </div>
        </div>
      </>
    );
    setDisplay(<Owners />);
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
            <button onClick={handleUsers}>
              <Link>Users</Link>
            </button>
            <button onClick={handleOwners}>
              <Link>Apartments Owners</Link>
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
            <h2>
              {uname ? uname.fname + " " + uname.lname : ""} Admin Dashboard
            </h2>
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

export default AdminUser;
