import React, { useEffect, useState } from "react";
import Sidebar from "../VaccineSidebar";
import { InputLabel,Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import * as IoIcons from "react-icons/io5";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../../../styles/vaccinated.css";
import {url} from "../../config"

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
  fset: {
    display: "flex",
    width: "100%",
    backgroundColor: "rgb(236, 236, 236);",
    alignItems: "center",
    padding: "15px",
    color: "rgb(96, 79, 255)",
    margin: "5px",
    justifyContent: "center",
    color: "blue",
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
    height: "auto",
  },
  all: {
    marginTop: "10px",
    height: "auto",
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
  fontx: {
    fontSize: "20px",
  },
}));

const CheckBookingDetails = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [vaccineData, setVaccineData] = useState([]);
  const search = useLocation().search;
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleClickSuccessOpen = () => {
    setOpenSuccess(true);
  };
  
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    window.location.href = "/vaccine/vaccinelist";  

  };
  useEffect(() => {
    const id = new URLSearchParams(search).get("id");
    console.log(id);

    fetchCenterData(id);
    fetchVaccineData(id);
  }, []);

  const fetchCenterData = (id) => {
    axios
      .get(`${url.BASE_URL}/RegisterDetails`, { params: { id: id } })
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
      .get(`${url.BASE_URL}/BookedVaccine`, {
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
  const handleClick = (id) => {
    axios
      .get(`${url.BASE_URL}/confirmvaccine`, {
        params: { book: data.booking_id, dose: data.dose },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data == "Success") {
            handleClickSuccessOpen();
            console.log("data passed");
          }
        // alert("Confirmed");

      });

    console.log(data.booking_id);
  };
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="container tab-screen">
        <div className="AddBody-center2">
          <div className="heading-center">
            <div className={classes.icon}>
              <Link to="/vaccine/vaccinelist">
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
                <h4 className={classes.fontx}>Full name</h4>
              </div>
              <div className={classes.set}>
                {" "}
                <p>{data.fullname}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontx}>NIC</h4>
              </div>
              <div className={classes.set}>
                <p>{data.nic}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontx}>Vaccine</h4>
              </div>
              <div className={classes.set}>
                <p>{vaccineData.vaccine_name}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontx}>Dose</h4>
              </div>
              <div className={classes.set}>
                <p>{data.dose}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontx}>ID type</h4>
              </div>
              <div className={classes.set}>
                <p>{data.id_type}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontx}>Address</h4>
              </div>
              <div className={classes.set}>
                <p>{data.address}</p>
              </div>
            </div>
            <div className={classes.vset}>
              <div className={classes.tset}>
                <h4 className={classes.fontx}>Booked Date</h4>
              </div>
              <div className={classes.set}>
                {/* <p>{data.date && data.date.substring(0, 10)}</p> */}
                <p>
                  {data.date &&
                    new Date(
                      new Date(data.date.substring(0, 10)).setDate(
                        new Date(data.date.substring(0, 10)).getDate() + 1
                      )
                    )
                      .toISOString()
                      .substring(0, 10)}
                </p>
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
            <div className={classes.vset}>
              <div className={classes.fset}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                  autoFocus
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Successfull!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Successfully added the vaccine center.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckBookingDetails;
