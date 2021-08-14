import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import "../styles/Register.css";
import logo from "../images/logo.png";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const Register = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [NIC, setNIC] = useState("");
  const [Date, setDate] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [Email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [Gender, setGender] = useState("");
  const [FirstNameErr, setFirstNameErr] = useState("");
  const [LastNameErr, setLastNameErr] = useState("");
  const [AddressErr, setAddressErr] = useState("");
  const [ContactNumberErr, setContactNumberErr] = useState("");
  const [NICErr, setNICErr] = useState("");
  const [DateErr, setDateErr] = useState("");
  const [UserRoleErr, setUserRoleErr] = useState("");
  const [EmailErr, setEmailErr] = useState("");
  const [UserNameErr, setUserNameErr] = useState("");
  const [PasswordErr, setPasswordErr] = useState("");
  const [RePasswordErr, setRePasswordErr] = useState("");
  const [GenderErr, setGenderErr] = useState("");
  const [Created, setCreated] = useState("");

  let formData = {
    FirstName: FirstName,
    LastName: LastName,
    NIC: NIC,
    Email: Email,
    Address: Address,
    Date: Date,
    Gender: Gender,
    ContactNumber: ContactNumber,
    Password: Password,
    UserRole: UserRole,
    UserName: UserName,
  };
  const Validate = (e) => {
    setCreated("");
    let flag = 0;
    e.preventDefault();
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        Email
      ) ||
      !Email
    ) {
      setEmailErr("Invalid email address");
      flag = 1;
    } else {
      setEmailErr("");
    }
    if (!/^[a-zA-Z]+$/.test(FirstName) || !FirstName) {
      setFirstNameErr("Invalid First Name");
      flag = 1;
    } else {
      setFirstNameErr("");
    }
    if (!/^[a-zA-Z0-9.,/-: ]*$/.test(Address) || !Address) {
      setAddressErr("Invalid Address");
      flag = 1;
    } else {
      setAddressErr("");
    }
    if (!/^[a-zA-Z]+$/.test(LastName) || !LastName) {
      setLastNameErr("Invalid Last Name");
      flag = 1;
    } else {
      setLastNameErr("");
    }
    if (!/^\(?(07)\)?([0-9]{8})$/.test(ContactNumber) || !ContactNumber) {
      setContactNumberErr("Invalid Contact Number");
      flag = 1;
    } else {
      setContactNumberErr("");
    }
    if (!/^([0-9]{9}?[Vv])+$/.test(NIC) || !NIC) {
      setNICErr("Invalid NIC");
      flag = 1;
    } else {
      setNICErr("");
    }
    if (!Date) {
      setDateErr("Date of birth is not selected");
      flag = 1;
    } else {
      setDateErr("");
    }
    if (!UserRole) {
      setUserRoleErr("User role  is not selected");
      flag = 1;
    } else {
      setUserRoleErr("");
    }
    if (!Gender) {
      setGenderErr("Gender is not selected");
      flag = 1;
    } else {
      setGenderErr("");
    }
    if (!/^[a-zA-Z0-9.!@#$%&'*+/=?^_`{|}~-]*$/.test(UserName) || !UserName) {
      setUserNameErr("Invalid User Name");
      flag = 1;
    } else {
      setUserNameErr("");
    }
    if (!/^([a-zA-Z0-9.!@#$%&'*+/=?^_`{|}~-]{8})$/.test(Password) || !Password) {
      setPasswordErr("Invalid Password");
      setRePasswordErr("");
      flag = 1;
    } else {
      setPasswordErr("");
      if (!(Password == RePassword)) {
        setRePasswordErr("Password is not confirmed");
        flag = 1;
      } else {
        setRePasswordErr("");
      }
    }
    if (flag == 0) {
      add();
    }
  };

  const add = () => {
    // console.log(FirstName)
    Axios.post("http://localhost:3002/create", formData).then((res) => {
      setCreated(res.data.message);
      if(res.data.message=="Success"){
        window.location.href = "/"
      }
    });
  };

  return (
    <div className="Register">
      <h1 className="RegisterH1">Registration</h1>
      <div className="Register_1">
        <div className="R-div_img">
          <img className="R-logo" src={logo} />
        </div>
        <div className="Registration_content">
          <form className="R-form">
            <div className="R-insideForm">
              <div className="R-left">
                <div className="R-input-div1">
                  <div className="i">
                    <BiUserCircle
                      className="icon"
                      color="#4049A0"
                    ></BiUserCircle>
                  </div>
                  <div className="R-divInput">
                    <input
                      type="text"
                      className="R-input"
                      placeholder="First Name"
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {FirstNameErr}
                  </div>
                </div>
                <div className="R-input-div2">
                  <div className="i">
                    <BiUserCircle
                      className="icon"
                      color="#4049A0"
                    ></BiUserCircle>
                  </div>
                  <div className="R-divInput">
                    <input
                      type="text"
                      className="R-input"
                      placeholder="Last Name"
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {LastNameErr}
                  </div>
                </div>
                <div className="R-input-div1">
                  <div className="i">
                    <FaRegAddressCard
                      className="icon"
                      color="#4049A0"
                    ></FaRegAddressCard>
                  </div>
                  <div className="R-divInput">
                    <input
                      type="text"
                      className="R-input"
                      placeholder="Address"
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>{AddressErr}</div>
                </div>
                <div className="R-input-div2">
                  <div className="i">
                    <RiContactsBook2Line
                      className="icon"
                      color="#4049A0"
                    ></RiContactsBook2Line>
                  </div>
                  <div className="R-divInput">
                    <input
                      type="tel"
                      className="input"
                      placeholder="Contact Number"
                      onChange={(event) => {
                        setContactNumber(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {ContactNumberErr}
                  </div>
                </div>
                <div className="R-input-div1">
                  <div className="i">
                    <BiUserCircle
                      className="icon"
                      color="#4049A0"
                    ></BiUserCircle>
                  </div>
                  <div className="R-divInput">
                    <input
                      type="text"
                      className="R-input"
                      placeholder="NIC"
                      onChange={(event) => {
                        setNIC(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>{NICErr}</div>
                </div>
                <div className="R-input-div2">
                  {/* <div className="i">
                    <MdDateRange className="icon" color="#4049A0"></MdDateRange>
                  </div> */}
                  <div className="R-divInput">
                    <label style={{color: "#4049A0", marginLeft: "-18px"}}>DOB</label>
                    <input
                      type="date"
                      className="R-input"
                      placeholder="Date of birth"
                      onChange={(event) => {
                        setDate(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>{DateErr}</div>
                </div>
                <div className="R-input-div1">
                  <div className="R-divInput">
        
                    {/* <label>Choose a user role:</label> */}
                    <select
                      name="UserRole"
                      className="R-userRole"
                      onChange={(event) => {
                        setUserRole(event.target.value);
                      }}
                    >
                      <option>Select User role</option>
                      <option>Vaccine Manager</option>
                      <option>Contact Tracing Manager</option>
                    </select>
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {UserRoleErr}
                  </div>
                </div>
              </div>
              <div className="R-right">
                <div className="R-input-div2">
                  <div className="R-divInput">
                    <input
                      type="radio"
                      value="Male"
                      name="Gender"
                      className="R-radio"
                      onChange={(event) => {
                        setGender(event.target.value);
                      }}
                    />
                    Male
                    <input
                      type="radio"
                      value="Female"
                      name="Gender"
                      className="R-radio"
                      onChange={(event) => {
                        setGender(event.target.value);
                      }}
                    />
                    Female
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>{GenderErr}</div>
                </div>
                <div className="R-input-div2">
                  <div className="i">
                    <MdEmail className="icon" color="#4049A0"></MdEmail>
                  </div>
                  <div className="R-divInput">
                    <input
                      type="email"
                      className="R-input"
                      placeholder="Email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>{EmailErr}</div>
                </div>
                <div className="R-input-div1">
                  <div className="i">
                    <BiUserCircle
                      className="icon"
                      color="#4049A0"
                    ></BiUserCircle>
                  </div>
                  <div className="R-divInput">
                    <input
                      type="text"
                      className="R-input"
                      placeholder="User Name"
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {UserNameErr}
                  </div>
                </div>
                <div className="R-input-div2">
                  <div className="i">
                    <RiLockPasswordFill
                      className="icon"
                      color="#4049A0"
                    ></RiLockPasswordFill>
                  </div>
                  <div className="R-divInput">
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {PasswordErr}
                  </div>
                </div>
                <div className="R-input-div1">
                  <div className="i">
                    <RiLockPasswordFill
                      className="icon"
                      color="#4049A0"
                    ></RiLockPasswordFill>
                  </div>
                  <div className="R-divInput">
                    <input
                      type="Password"
                      className="input"
                      placeholder="Confirm Password"
                      onChange={(event) => {
                        setRePassword(event.target.value);
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {RePasswordErr}
                  </div>
                </div>
                <div className="input-div3">
                  <button className="R-btn" value="Register" onClick={Validate}>
                    Register
                  </button>
                  <div style={{ fontSize: 16, color: "green" ,fontWeight:"bold"}}>{Created}</div>
                  <Link to="/" className="R-Login">
                    Already have an account? Login Now!
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
