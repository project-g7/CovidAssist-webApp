import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import "../styles/Login.css";
import logo from "../images/newLogo.png";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import {url} from './config'

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [logged, setLogged] = useState("");
  const submit = (e) => {
    Axios.post(`${url.BASE_URL}/login`, {
      Password: Password,
      UserName: UserName,
    }).then((res) => {
      console.log(res.data);
      if (res.data.message) {
        setLoginError(res.data.message);
        setLogged("");
      } else {
        setLoginError("");
        console.log("===============");
        console.log(res.data);
        localStorage.setItem("token",res.data.token);
        setLogged("You have logged in as " + res.data.result[0].first_name);
        let userRole = res.data.result[0].user_role;
        let obj = {
          user_id: res.data.result[0].user_id,
          user_name: res.data.result[0].user_name,
        };
        sessionStorage.setItem("sessionStorageData", JSON.stringify(obj));
        if (userRole == "admin") {
          console.log("1");
          window.location.href = "/admin";
        } else if (userRole == "Vaccine Manager") {
          window.location.href = "/vaccine";
        } else if (userRole == "Contact Tracing Manager") {
          window.location.href = "/contactTracing";
        }
      }
    });
  };
  // const display = ()=>{
  //   console.log(UserName + " " + Password);
  // }
  useEffect(() => {
    let obj = {
      user_id: "",
      user_name: "",
    };
    sessionStorage.setItem("sessionStorageData", JSON.stringify(obj));
    localStorage.setItem("token","");


  }, []);


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
                  <BiUserCircle className="icon" color="#4049A0" size={24}></BiUserCircle>
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
                  <RiLockPasswordFill color="#4049A0" size={24}></RiLockPasswordFill>
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
