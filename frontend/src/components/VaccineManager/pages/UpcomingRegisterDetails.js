import React, { useEffect, useState } from "react";
import Sidebar from "../VaccineSidebar";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import * as IoIcons from "react-icons/io5";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
// import "../../../styles/VaccinationAreas.css";

const useStyles = makeStyles((theme) => ({

  tset: {
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
    fontWeight: "bold",
    color: "black",
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
  },
  fontl: {
    fontSize: "20px",
  },
}));

const UpcomingRegisterDetails = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [vaccineData, setVaccineData] = useState([]);
  const search = useLocation().search;
  useEffect(() => {
    const id = new URLSearchParams(search).get("id");
    console.log(id);

    fetchCenterData(id);
    fetchVaccineData(id);
  }, []);

  const fetchCenterData = (id) => {
    axios
      .get("http://localhost:3002/RegisterDetails", { params: { id: id } })
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchVaccineData = (id) => {
    axios
      .get("http://localhost:3002/BookedVaccine", {
        params: { id: id },
      })
      .then((res) => {
        console.log(res.data[0][0]);
        // console.log(JSON.parse(res.data));
        setVaccineData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="container tab-screen">
        <div className="AddBody-center">
          <div className="heading-center">
            <div className={classes.icon}>
              <Link to="/vaccine/upcoming">
                <IoIcons.IoArrowBack />
              </Link>
            </div>
            <div className={classes.heading}>
              <h3>Register Details</h3>
            </div>
          </div>
          <div className={classes.all}>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontl}>Full name</h4>
              </div>
              <div className={classes.set}>
                {" "}
                <p>{data.fullname}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontl}>NIC</h4>
              </div>
              <div className={classes.set}>
                <p>{data.nic}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontl}>Vaccine</h4>
              </div>
              <div className={classes.set}>
                <p>{vaccineData.vaccine_name}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontl}>Dose</h4>
              </div>
              <div className={classes.set}>
                <p>{data.dose}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontl}>ID type</h4>
              </div>
              <div className={classes.set}>
                <p>{data.id_type}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontl}>Address</h4>
              </div>
              <div className={classes.set}>
                <p>{data.address}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontl}>Booked Date</h4>
              </div>
              <div className={classes.set}>
                {/* <p>{data.date && data.date.substring(0, 10)}</p> */}
              <p>{data.date && new Date(new Date(data.date.substring(0, 10)).setDate(new Date(data.date.substring(0, 10)).getDate() + 1)).toISOString().substring(0, 10)}</p>

              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>

                <h4 className={classes.fontxx}>Time</h4>

              </div>
              <div className={classes.set}>
                <p>{data.time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingRegisterDetails;
