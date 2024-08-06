import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Login() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    logged: false,
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  function loginCheck(e) {
    e.preventDefault();

    let isValid = true;
    let validationErrors = {};
    if (FormData.password.length < 3) {
      isValid = false;
      validationErrors.password = "Check Password length";
    }

    if (Object.keys(validationErrors).length === 0) {
      axios.get("http://localhost:8000/users").then((result) => {
        result.data.map((user) => {
          if (user.username === FormData.username) {
            if (user.password === FormData.password) {
              FormData.logged = true;
              if (FormData.logged && user.username === FormData.username) {
                axios.post("http://localhost:8000/isLogged", FormData);
              }
              navigate("../standardUser");
            } else {
              isValid = false;
              validationErrors.password = "Wrong Password";
            }
          } else if (FormData.username === "") {
            isValid = false;
            validationErrors.username = "Username is required";
          }
        });
        setErrors(validationErrors);
        setValid(isValid);
      });
    }
  }

  return (
    <>
      <Navbar />
      <section id="login-home">
        <div id="login-form">
          <div id="form-title">
            <h2>LOGIN FORM</h2>
          </div>
          <div className="login-body">
            <form action="#" id="login-ui-form" onSubmit={loginCheck}>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                required
                onChange={(event) =>
                  setFormData({ ...FormData, username: event.target.value })
                }
              />
              <input
                type="password"
                name="password"
                id="userPassword"
                placeholder="Enter Password"
                required
                onChange={(event) =>
                  setFormData({ ...FormData, password: event.target.value })
                }
              />
              <button id="login-btn" type="submit">
                LOGIN
              </button>
              <div id="auth-error">
                {valid ? (
                  <></>
                ) : (
                  <span>
                    {errors.password} {errors.username}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
