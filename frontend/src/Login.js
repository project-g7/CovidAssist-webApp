import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import "../styles/Login.css";
import logo from "../images/logo.png";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [logged, setLogged] = useState("");
  const submit = (e) => {
    Axios.post("http://localhost:3002/login", {
      Password: Password,
      UserName: UserName,
    }).then((res) => {
      // console.log(res.data);
      if (res.data.message) {
        setLoginError(res.data.message);
        setLogged("");
      } else {
        setLoginError("");
        console.log(res.data);
        setLogged("You have logged in as " + res.data[0].first_name);
        let userRole = res.data[0].user_role;
        if(userRole == 'admin'){
          window.location.href = "/admin";
        }else if(userRole == 'Vaccine Manager'){
          window.location.href = "/vaccine";
        }else if(userRole == 'Contact Tracing Manager'){
          window.location.href = "/ct";
        }
      }
    });
  };
  // const display = ()=>{
  //   console.log(UserName + " " + Password);
  // }
  return (
    <div className="login">
      <h1 className="logH1">LogIn</h1>
      <div className="login_1">
        <div className="div_img">
          <img className="logo1" src={logo} />
        </div>

        <div className="login_content">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="insideForm">
              <div style={{ fontSize: 12, color: "red" }}>{loginError}</div>
              <div style={{ fontSize: 12, color: "blue" }}>{logged}</div>
              <div className="input-div1">
                <div className="i">
                  <BiUserCircle className="icon" color="#4049A0"></BiUserCircle>
                </div>
                <div className="divInput">
                  <input
                    type="text"
                    className="input"
                    placeholder="User Name"
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input-div2">
                <div className="i">
                  <RiLockPasswordFill color="#4049A0"></RiLockPasswordFill>
                </div>
                <div className="divInput">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
              </div>
              <Link to="/ForgotPassword" className="forgot">
                Forgot Password?
              </Link>
              <div className="input-div3">
                <button className="btn1" value="Login" onClick={submit}>
                  Login
                </button>
                <Link to="/Register" className="register">
                  Don’t have an account? Register Now!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
