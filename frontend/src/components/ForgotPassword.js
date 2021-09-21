import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import "../styles/Login.css";
import logo from "../images/newLogo.png";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
const ForgotPassword = () => {
  const [UserName, setUserName] = useState("");
  const[Massage,setMassage]=useState("")
  const submit = (e) => {

    Axios.post("http://localhost:3002/forgotPassword", {
      UserName: UserName,
    }).then((res) => {
      console.log(res.data);
      if (res.data.message) {
            setMassage("Cannot find the account");
            console.log(res.data,Massage);
      } else {
        console.log("===============");
        console.log(res.data);
        setMassage("Check your email");
      }
      setUserName("");
    });
  };

  return (
    <div className="login">
      <h1 className="logH1">Forgot Password</h1>
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
        <div style={{color:"red"}}>{Massage}</div>

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
                    value={UserName}
                  />
                </div>
              </div>
              <div className="input-div3">
                <button className="btn1" value="Login" onClick={submit} type="submit">
                  Submit
                </button>
                <Link to="/Register" className="register" >
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
export default ForgotPassword;
