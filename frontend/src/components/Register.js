import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useFormik } from "formik";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import "../styles/Register.css";
import logo from "../images/newLogo.png";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { Grid, Paper, MenuItem, TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import HowToRegIcon from "@material-ui/icons/HowToReg";
const Register = () => {
  // const [FirstName, setFirstName] = useState("");
  // const [LastName, setLastName] = useState("");
  // const [Address, setAddress] = useState("");
  // const [ContactNumber, setContactNumber] = useState("");
  // const [NIC, setNIC] = useState("");
  // const [Date, setDate] = useState("");
  // const [UserRole, setUserRole] = useState("");
  // const [Email, setEmail] = useState("");
  // const [UserName, setUserName] = useState("");
  // const [Password, setPassword] = useState("");
  // const [RePassword, setRePassword] = useState("");
  // const [Gender, setGender] = useState("");
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

  const initialValues = {
    FirstName: "",
    LastName: "",
    Address: "",
    ContactNumber: "",
    NIC: "",
    UserRole: "",
    Date: "",
    Gender: "",
    Email: "",
    UserName: "",
    Password: "",
    RePassword: "",
  };
  const onSubmit = (values) => {
    let formData = {
      FirstName: values.FirstName,
      LastName: values.LastName,
      NIC: values.NIC,
      Email: values.Email,
      Address: values.Address,
      Date: values.Date,
      Gender: values.Gender,
      ContactNumber: values.ContactNumber,
      Password: values.Password,
      UserRole:values.UserRole,
      UserName: values.UserName,
    };
    console.log("Form data", values);
    console.log("Form data nuvin nuvn  jnvjdfb dfugh uh");
    Axios.post("http://localhost:3002/create", formData).then((res) => {
      setCreated(res.data.message);
      if (res.data.message == "Success") {
        window.location.href = "/";
      }
    });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.FirstName) {
      errors.FirstName = "Required";
    } else if (!/^[a-zA-Z]+$/.test(values.FirstName)) {
      errors.FirstName = "Invalid First Name";
    }

    if (!values.LastName) {
      errors.LastName = "Required";
    } else if (!/^[a-zA-Z]+$/.test(values.LastName)) {
      errors.LastName = "Invalid Last Name";
    }
    if (!values.Address) {
      errors.Address = "Required";
    } else if (!/^[a-zA-Z0-9.,/-: ]*$/.test(values.Address)) {
      errors.Address = "Invalid Address";
    }
    if (!values.ContactNumber) {
      errors.ContactNumber = "Required";
    } else if (!/^\(?(07)\)?([0-9]{8})$/.test(values.ContactNumber)) {
      errors.ContactNumber = "Invalid ContactNumber";
    }

    if (!values.NIC) {
      errors.NIC = "Required";
    } else if (!/^([0-9]{9}?[Vv])+$/.test(values.NIC)) {
      errors.NIC = "Invalid NIC";
    }
    if (!values.Date) {
      errors.Date = "Required";
    }
    if (!values.Email) {
      errors.Email = "Required";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.Email
      )
    ) {
      errors.Email = "Invalid Email";
    }
    if (!values.UserName) {
      errors.UserName = "Required";
    } else if (!/^[a-zA-Z0-9.!@#$%&'*+/=?^_`{|}~-]*$/.test(values.UserName)) {
      errors.UserName = "Invalid User name";
    }
    if (!values.UserRole) {
      errors.UserRole = "Required";
    }
    if (!values.Gender) {
      errors.Gender = "Required";
    }
    if (!values.Email) {
      errors.Email = "Required";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.Email
      )
    ) {
      errors.Email = "Invalid Email";
    }
    if (!values.Password) {
      errors.Password = "Required";
    } else if (
      !/^([a-zA-Z0-9.!@#$%&'*+/=?^_`{|}~-]{8})$/.test(values.Password)
    ) {
      errors.Password = "Password Should Contain 8 characters";
    }
    if (!(values.Password == values.RePassword) && (!errors.Password)) {
      errors.RePassword="Password is not matching";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  
  // const Validate = (e) => {
  //   setCreated("");
  //   let flag = 0;
  //   e.preventDefault();
  //   if (
  //     !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
  //       Email
  //     ) ||
  //     !Email
  //   ) {
  //     setEmailErr("Invalid email address");
  //     flag = 1;
  //   } else {
  //     setEmailErr("");
  //   }
  //   if (!/^[a-zA-Z]+$/.test(FirstName) || !FirstName) {
  //     setFirstNameErr("Invalid First Name");
  //     flag = 1;
  //   } else {
  //     setFirstNameErr("");
  //   }
  //   if (!/^[a-zA-Z0-9.,/-: ]*$/.test(Address) || !Address) {
  //     setAddressErr("Invalid Address");
  //     flag = 1;
  //   } else {
  //     setAddressErr("");
  //   }
  //   if (!/^[a-zA-Z]+$/.test(LastName) || !LastName) {
  //     setLastNameErr("Invalid Last Name");
  //     flag = 1;
  //   } else {
  //     setLastNameErr("");
  //   }
  //   if (!/^\(?(07)\)?([0-9]{8})$/.test(ContactNumber) || !ContactNumber) {
  //     setContactNumberErr("Invalid Contact Number");
  //     flag = 1;
  //   } else {
  //     setContactNumberErr("");
  //   }
  //   if (!/^([0-9]{9}?[Vv])+$/.test(NIC) || !NIC) {
  //     setNICErr("Invalid NIC");
  //     flag = 1;
  //   } else {
  //     setNICErr("");
  //   }
  //   if (!Date) {
  //     setDateErr("Date of birth is not selected");
  //     flag = 1;
  //   } else {
  //     setDateErr("");
  //   }
  //   if (!UserRole) {
  //     setUserRoleErr("User role  is not selected");
  //     flag = 1;
  //   } else {
  //     setUserRoleErr("");
  //   }
  //   if (!Gender) {
  //     setGenderErr("Gender is not selected");
  //     flag = 1;
  //   } else {
  //     setGenderErr("");
  //   }
  //   if (!/^[a-zA-Z0-9.!@#$%&'*+/=?^_`{|}~-]*$/.test(UserName) || !UserName) {
  //     setUserNameErr("Invalid User Name");
  //     flag = 1;
  //   } else {
  //     setUserNameErr("");
  //   }
  //   if (
  //     !/^([a-zA-Z0-9.!@#$%&'*+/=?^_`{|}~-]{8})$/.test(Password) ||
  //     !Password
  //   ) {
  //     setPasswordErr("Invalid Password");
  //     setRePasswordErr("");
  //     flag = 1;
  //   } else {
  //     setPasswordErr("");
  //     if (!(Password == RePassword)) {
  //       setRePasswordErr("Password is not confirmed");
  //       flag = 1;
  //     } else {
  //       setRePasswordErr("");
  //     }
  //   }
  //   if (flag == 0) {
  //     add();
  //   }
  // };
  console.log("Form errors", formik.errors);

  const add = () => {
    // console.log(FirstName)
    
  };

  return (
    <div className="Register">
      <h1 className="RegisterH1">Registration</h1>
      <div className="Register_1">
        <div className="R-div_img">
          <img className="logo2" src={logo} />
        </div>
        <div className="Registration_content">
          <form className="R-form" onSubmit={formik.handleSubmit}>
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
                    <TextField
                      fullWidth
                      label="First Name"
                      placeholder="Enter your first name"
                      // onChange={(event) => {
                      //   setFirstName(event.target.value);
                      // }}
                      name="FirstName"
                      onChange={formik.handleChange}
                      value={formik.values.FirstName}
                      onBlur={formik.handleBlur}
                    ></TextField>
                  </div>
                </div>
                {formik.touched.FirstName && formik.errors.FirstName ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.FirstName}
                  </div>
                ) : null}
                <div className="R-input-div2">
                  <div className="i">
                    <BiUserCircle
                      className="icon"
                      color="#4049A0"
                    ></BiUserCircle>
                  </div>
                  <div className="R-divInput">
                    <TextField
                      id="LastName"
                      fullWidth
                      label="LastName"
                      placeholder="Enter your last Name"
                      // onChange={(event) => {
                      //   setLastName(event.target.value);
                      // }}
                      name="LastName"
                      onChange={formik.handleChange}
                      value={formik.values.LastName}
                      onBlur={formik.handleBlur}
                    ></TextField>
                  </div>
                </div>
                {formik.touched.LastName && formik.errors.LastName ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.LastName}
                  </div>
                ) : null}

                <div className="R-input-div1">
                  <div className="i">
                    <FaRegAddressCard
                      className="icon"
                      color="#4049A0"
                    ></FaRegAddressCard>
                  </div>
                  <div className="R-divInput">
                    <TextField
                      fullWidth
                      label="Address"
                      placeholder="Enter your Address"
                      // onChange={(event) => {
                      //   setAddress(event.target.value);
                      // }}
                      name="Address"
                      onChange={formik.handleChange}
                      value={formik.values.Address}
                      onBlur={formik.handleBlur}
                    ></TextField>
                  </div>
                </div>
                {formik.touched.Address && formik.errors.Address ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.Address}
                  </div>
                ) : null}
                <div className="R-input-div2">
                  <div className="i">
                    <RiContactsBook2Line
                      className="icon"
                      color="#4049A0"
                    ></RiContactsBook2Line>
                  </div>
                  <div className="R-divInput">
                    <TextField
                      type="tel"
                      fullWidth
                      label="Contact Number"
                      placeholder="Enter your Contact Number"
                      // onChange={(event) => {
                      //   setContactNumber(event.target.value);
                      // }}
                      name="ContactNumber"
                      onChange={formik.handleChange}
                      value={formik.values.ContactNumber}
                      onBlur={formik.handleBlur}
                    ></TextField>
                  </div>
                </div>
                {formik.touched.ContactNumber && formik.errors.ContactNumber ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.ContactNumber}
                  </div>
                ) : null}
                <div className="R-input-div1">
                  <div className="i">
                    <BiUserCircle
                      className="icon"
                      color="#4049A0"
                    ></BiUserCircle>
                  </div>
                  <div className="R-divInput">
                    <TextField
                      fullWidth
                      label="NIC"
                      placeholder="Enter your NIC"
                      // onChange={(event) => {
                      //   setNIC(event.target.value);
                      // }}
                      name="NIC"
                      onChange={formik.handleChange}
                      value={formik.values.NIC}
                      onBlur={formik.handleBlur}
                    ></TextField>
                  </div>
                </div>
                {formik.touched.NIC && formik.errors.NIC ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.NIC}
                  </div>
                ) : null}
                <div className="R-input-div2">
                  <div className="i">
                    <MdDateRange className="icon" color="#4049A0"></MdDateRange>
                  </div>
                  <div className="R-divInput">
                    <TextField
                      id="date"
                      label="Date of Birthday"
                      type="date"
                      defaultValue="2017-05-24"
                      style={{ width: "100%" }}
                      sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
                      name="Date"
                      onChange={formik.handleChange}
                      value={formik.values.Date}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                {formik.touched.Date && formik.errors.Date ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.Date}
                  </div>
                ) : null}
                <div className="R-input-div1">
                    <div className="i">
                      <BiUserCircle
                        className="icon"
                        color="#4049A0"
                      ></BiUserCircle>
                    </div>
                    <div className="R-divInput"> 
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        style={{width:"100%"}}
                        // onChange={(event) => {
                        //   setUserRole(event.target.value);
                        // }}
                        name="UserRole"
                        onChange={formik.handleChange}
                        value={formik.values.UserRole}
                        onBlur={formik.handleBlur}
                        helperText="Please select your role"
                      >
                        <MenuItem value={"Vaccine Manager"}>
                          Vaccine Manager
                        </MenuItem>
                        <MenuItem value={"Contact Tracing Manager"}>
                          Contact Tracing Manager
                        </MenuItem>
                      </TextField>
                    </div>
                </div>
                {formik.touched.UserRole && formik.errors.UserRole ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.UserRole}
                  </div>
                ) : null}
              </div>
              <div className="R-right">
                <div className="R-input-div2">
                  <div className="R-divInputRadio">
                    
                      <FormControl
                        component="fieldset"
                        // style={{ marginTop: "20px" }}
                      >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          style={{ display: "inline" }}
                          // onChange={(event) => {
                          //   setGender(event.target.value);
                          // }}
                          name="Gender"
                          onChange={formik.handleChange}
                          value={formik.values.Gender}
                          onBlur={formik.handleBlur}
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio color="primary" />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio color="primary" />}
                            label="Male"
                          />
                        </RadioGroup>
                      </FormControl>
                    
                  </div>
                </div>
                {formik.touched.Gender && formik.errors.Gender ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.Gender}
                  </div>
                ) : null}
                <div className="R-input-div-email">
                  <div className="i">
                    <MdEmail className="icon" color="#4049A0"></MdEmail>
                  </div>
                  <div className="R-divInput">
                    <TextField
                      type="email"
                      fullWidth
                      label="Email"
                      placeholder="Enter your Email"
                      // onChange={(event) => {
                      //   setEmail(event.target.value);
                      // }}
                      name="Email"
                      onChange={formik.handleChange}
                      value={formik.values.Email}
                      onBlur={formik.handleBlur}
                    ></TextField>
                  </div>
                </div>
                {formik.touched.Email && formik.errors.Email ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.Email}
                  </div>
                ) : null}
                <div className="R-input-div1">
                  <div className="i">
                    <BiUserCircle
                      className="icon"
                      color="#4049A0"
                    ></BiUserCircle>
                  </div>
                  <div className="R-divInput">
                    <TextField
                      type="text"
                      fullWidth
                      label="User Name"
                      placeholder="Enter your User Name"
                      // onChange={(event) => {
                      //   setUserName(event.target.value);
                      // }}
                      name="UserName"
                      onChange={formik.handleChange}
                      value={formik.values.UserName}
                      onBlur={formik.handleBlur}
                    ></TextField>
                  </div>
                </div>
                {formik.touched.UserName && formik.errors.UserName ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.UserName}
                  </div>
                ) : null}
                <div className="R-input-div2">
                  <div className="i">
                    <RiLockPasswordFill
                      className="icon"
                      color="#4049A0"
                    ></RiLockPasswordFill>
                  </div>
                  <div className="R-divInput">
                    <TextField
                      type="password"
                      fullWidth
                      label="Password"
                      placeholder="Password"
                      // onChange={(event) => {
                      //   setPassword(event.target.value);
                      // }}
                      name="Password"
                      onChange={formik.handleChange}
                      value={formik.values.Password}
                      onBlur={formik.handleBlur}
                    ></TextField>
                  </div>
                </div>
                {formik.touched.Password && formik.errors.Password ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.Password}
                  </div>
                ) : null}
                <div className="R-input-div1">
                  <div className="i">
                    <RiLockPasswordFill
                      className="icon"
                      color="#4049A0"
                    ></RiLockPasswordFill>
                  </div>
                  <div className="R-divInput">
                    <TextField
                      type="password"
                      fullWidth
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      // onChange={(event) => {
                      //   setRePassword(event.target.value);
                      // }}
                      name="RePassword"
                      onChange={formik.handleChange}
                      value={formik.values.RePassword}
                      onBlur={formik.handleBlur}
                    ></TextField>
                  </div>
                </div>
                {formik.touched.RePassword && formik.errors.RePassword ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formik.errors.RePassword}
                  </div>
                ) : null}
                <div className="input-div3">
                  <button
                    type="submit"
                    className="R-btnr"
                    value="Register"
                    // onClick={Validate}
                  >
                    Register
                  </button>
                  <div
                    style={{ fontSize: 16, color: "green", fontWeight: "bold" }}
                  >
                    {Created}
                  </div>
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
