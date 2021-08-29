import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import * as IoIcons from "react-icons/io5";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  tset: {
    display: "flex",
    width: "50%",
    backgroundColor: "rgb(236, 236, 236);",
    alignItems: "center",
    padding: "15px",
    color:"rgb(96, 79, 255)",
    margin: "5px",
  },
  set: {
    display: "flex",
    width: "50%",
    fontSize: "20px",
    backgroundColor: "rgb(236, 236, 236);",
    alignItems: "center",
    padding: "15px",
    margin: "5px",
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
      width:"90%",
    display:'flex',
    justifyContent: "center",
  },
}));

const DisplayCenter = () => {
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
      .get("http://localhost:3002/vaccineCenterDetails", { params: { id: id } })
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
      .get("http://localhost:3002/vaccineCenterVaccineDetails", {
        params: { id: id },
      })
      .then((res) => {
        console.log(res);
        console.log(JSON.parse(res.data));
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
          <div className="heding-center">
            <div className={classes.icon}>
              <Link to="/admin/vaccinemanage">
                <IoIcons.IoArrowBack />
              </Link>
            </div>
            <div className={classes.heading}>
              <h3>Vaccine Center</h3>
            </div>
          </div>
          <div className={classes.all}>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Vacicne Center name</h4>
              </div>
              <div className={classes.set}>
                {" "}
                <p>{data.name}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>District</h4>
              </div>
              <div className={classes.set}>
                <p>{data.district}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Vaccine</h4>
              </div>
              <div className={classes.set}>
                <p>{data.name}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Dose 1 Quantity</h4>
              </div>
              <div className={classes.set}>
                <p>{vaccineData.dose_1_quantity}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Dose 2 Quantity</h4>
              </div>
              <div className={classes.set}>
                <p>{vaccineData.dose_2_quantity}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Dose 3 Quantity</h4>
              </div>
              <div className={classes.set}>
                <p>{vaccineData.dose_3_quantity}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Available Dates</h4>
              </div>
              <div className={classes.set}>
                <p>
                  {data.start_date && data.start_date.substring(0, 10)} to{" "}
                  {data.end_date && data.end_date.substring(0, 10)}
                </p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4>Assinged Manager</h4>
              </div>
              <div className={classes.set}>
                <p>{data.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCenter;
