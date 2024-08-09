import React, { useState } from "react";
import "./Signup.css";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Signup() {
  const [FormData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "",
    location: "",
    id: null,
    accType: "",
    username: "",
    password: "",
    cpassword: "",
    balance: "0",
    email: "",
    type: "standard",
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (FormData.password !== FormData.cpassword) {
      isValid = false;
      validationErrors.cpassword = "Password Must Match.";
    }
    setErrors(validationErrors);
    setValid(isValid);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8000/users", FormData)
        .then((result) => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
    console.log(FormData);
  };
  return (
    <>
      <Navbar />
      <section id="signup-home">
        <div id="signup-form">
          <div id="form-title">
            <h2>SIGN-UP FORM</h2>
          </div>
          <div id="signup-body">
            <form action="#" id="signup" onSubmit={handleSubmit}>
              <fieldset>
                <legend>Enter your Name</legend>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Enter First Name"
                  required
                  onChange={(event) =>
                    setFormData({ ...FormData, fname: event.target.value })
                  }
                />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter Last Name"
                  required
                  onChange={(event) =>
                    setFormData({ ...FormData, lname: event.target.value })
                  }
                />
              </fieldset>

              <fieldset>
                <legend>Choose Gender</legend>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={(event) =>
                    setFormData({ ...FormData, gender: event.target.value })
                  }
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={(event) =>
                    setFormData({ ...FormData, gender: event.target.value })
                  }
                />
              </fieldset>
              <div className="location-container">
                <label htmlFor="location">Location</label>
                <select
                  name="location"
                  id="location"
                  onChange={(event) =>
                    setFormData({ ...FormData, location: event.target.value })
                  }
                >
                  <option value="">
                    ---------------------------------------------
                  </option>
                  <option value="Nairobi">Nairobi</option>
                  <option value="Kisumu">Kisumu</option>
                  <option value="Mombassa">Mombassa</option>
                  <option value="Siaya">Siaya</option>
                  <option value="Eldoret">Eldoret</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="idNo">Enter ID Number</label>
                <input
                  type="number"
                  name="idNo"
                  id="idNo"
                  className="inp"
                  placeholder="Enter ID number"
                  required
                  onChange={(event) =>
                    setFormData({ ...FormData, id: event.target.value })
                  }
                />
              </div>

              <fieldset id="Verification">
                <legend>Verification Documents</legend>
                <div>
                  <label htmlFor="idPic">Upload your ID</label>
                  <input type="file" name="idPic" id="idPic" />
                </div>
                <div>
                  <label htmlFor="profilePic">
                    Upload your profile Picture
                  </label>
                  <input type="file" name="profilePic" id="profilePic" />
                </div>
              </fieldset>

              <fieldset id="acc-info">
                <legend>Account Details</legend>
                <label htmlFor="accType">Account Type</label>
                <select
                  name="acc-type"
                  id="acc-type"
                  className="inp"
                  onChange={(event) =>
                    setFormData({ ...FormData, accType: event.target.value })
                  }
                >
                  <option value="">-----------------------</option>
                  <option value="Apartment Owner">Apartment Owner</option>
                  <option value="Personal">Personal</option>
                </select>
                <label htmlFor="username">Enter username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="inp"
                  placeholder="Enter Username"
                  onChange={(event) =>
                    setFormData({ ...FormData, username: event.target.value })
                  }
                />
                <label htmlFor="password">Enter Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="inp"
                  placeholder="Enter Password"
                  onChange={(event) =>
                    setFormData({ ...FormData, password: event.target.value })
                  }
                />
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  className="inp"
                  placeholder="Confirm Password"
                  onChange={(event) =>
                    setFormData({ ...FormData, cpassword: event.target.value })
                  }
                />
              </fieldset>
              {valid ? <></> : <span>{errors.cpassword}</span>}
              <button id="signup-btn" type="submit">
                SIGN-UP
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
