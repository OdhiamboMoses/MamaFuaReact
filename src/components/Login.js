import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Login() {
  useEffect(() => {
    localStorage.clear();
  });
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
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
        let userFound = false;

        result.data.forEach((user) => {
          if (user.username === FormData.username) {
            userFound = true;
            if (user.password === FormData.password) {
              // Set the user session in localStorage
              localStorage.setItem(
                "username",
                JSON.stringify({
                  username: FormData.username,
                  fname: user.fname,
                  lname: user.lname,
                  logged: true,
                })
              );
              axios.post("http://localhost:8000/isLogged", {
                username: FormData.username,
                logged: true,
              });

              if (user.type === "standard") {
                navigate("../standardUser");
              } else if (user.type === "admin") {
                navigate("/AdminUser");
              }
            } else {
              isValid = false;
              validationErrors.password = "Wrong Password";
            }
          }
        });

        if (!userFound) {
          validationErrors.username = "Username does not exist";
        }

        setErrors(validationErrors);
        setValid(isValid);
      });
    } else {
      setErrors(validationErrors);
      setValid(isValid);
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
                {valid ? null : (
                  <span>
                    {`${errors.password}.`} {errors.username}
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
