import React, { useEffect, useState } from "react";
import Sidebar from "../ContactTracingSidebar";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import * as IoIcons from "react-icons/io5";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  tset: {
    fontSize: "20px",
    display: "flex",
    width: "50%",
    backgroundColor: "rgb(236, 236, 236);",
    alignItems: "center",
    padding: "15px",
    color: "blue",
    margin: "5px",
    fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
  },
  set: {
    display: "flex",
    width: "50%",
    fontSize: "20px",
    backgroundColor: "rgb(236, 236, 236);",
    alignItems: "center",
    padding: "15px",
    margin: "5px",
    color: "black",
    fontWeight: "bold",
    fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
  },
  vset: {
    display: "flex",
  },
  all: {
    marginTop: "10px",
  },
  icon: {
    marginLeft: "20px",
    fontSize: "30px",
  },
  heading: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
  },btn: {
    marginLeft:"700px",
    width: '40%',
    display: "flex",
    justifyContent:"space-around"
},
}));

const DisplayMobileUser = () => {
  const classes = useStyles();
  const [ve, setVe] = useState(0);
  const [data, setData] = useState([]);
  const search = useLocation().search;
  useEffect(() => {
    const id = new URLSearchParams(search).get("id");
    const ve = new URLSearchParams(search).get("ve");
    console.log(id);
    fetchUserData(id);
    setVe(ve);
  }, []);
  const fetchUserData = (id) => {
    axios
      .get("http://localhost:3002/MobileUserDetails", { params: { id: id } })
      .then((res) => {
        // console.log(res.data[0]);
        setData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data.tracing_key);
    console.log("nuvin");
  };
  const confirm = () => {
    console.log(data.tracing_key);
    axios
      .post("http://localhost:3002/confirm", [data.tracing_key])
      .then((res) => {
        console.log(res.data);
        console.log("Successs fetch");
      });
    window.location.href = "/contactTracing";
  };
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="container tab-screen">
        <div className="AddBody-center" style={{ height: "540px" }}>
          <div className="heading-center">
            <div className={classes.icon}>
              {ve == 0 ? (
                <Link to="/contactTracing">
                  <IoIcons.IoArrowBack />
                </Link>
              ) : (
                <Link to="/contactTracing/viewExposure">
                  <IoIcons.IoArrowBack />
                </Link>
              )}
            </div>
            <div className={classes.heading}>
              <h3> Mobile User Details</h3>
            </div>
          </div>
          <div className={classes.all}>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>User Id</h4>
              </div>
              <div className={classes.set}>
                <p>{data.mobile_user_id}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>First Name</h4>
              </div>
              <div className={classes.set}>
                <p>{data.first_name}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Last Name</h4>
              </div>
              <div className={classes.set}>
                <p>{data.last_name}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Address</h4>
              </div>
              <div className={classes.set}>
                <p>{data.address}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Contact Number</h4>
              </div>
              <div className={classes.set}>
                <p>{data.contact_number}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Email</h4>
              </div>
              <div className={classes.set}>
                <p>{data.email}</p>
              </div>
            </div>
            {ve == 0 && (
              <div className={classes.btn}>
              <Button
                variant="outlined"
                color="primary"
                component="span"
                onClick={() => confirm()}
              >
                Confirm as a covid patient
              </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayMobileUser;
