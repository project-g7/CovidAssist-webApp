import React, { useState, useEffect } from "react";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
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
  set: {
    display: "flex",
    width: "50%",
    fontSize: "20px",
    backgroundColor: "rgb(236, 236, 236);",
    alignItems: "center",
    padding: "15px",
    margin: "5px",
    fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
    fontWeight: "bold",
    color: "black",
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
  fontzz: {
    fontSize: "20px",
  },
}));
const MyProfile = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const getSessionData = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);
    console.log(data.user_name);

    axios
      .get(`${url.BASE_URL}/myprofile`, { params: { id: data.user_id } })
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSessionData();
  }, []);
  return (
    <div>
      <div className="AddBody-profile">
        <div className="heading">
          <div className={classes.heading}>
            <h3>My Profile</h3>
          </div>
        </div>
        <div className={classes.all}>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4 className={classes.fontzz}>First Name</h4>
            </div>
            <div className={classes.set}>
              {" "}
              <p>{data.first_name}</p>
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4 className={classes.fontzz}>Last Name</h4>
            </div>
            <div className={classes.set}>
              <p>{data.last_name}</p>
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4 className={classes.fontzz}>Username</h4>
            </div>
            <div className={classes.set}>
              <p>{data.user_name}</p>
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4 className={classes.fontzz}>NIC Number</h4>
            </div>
            <div className={classes.set}>
              <p>{data.nic}</p>
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4 className={classes.fontzz}>Email</h4>
            </div>
            <div className={classes.set}>
              <p>{data.email}</p>
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4 className={classes.fontzz}>Address</h4>
            </div>
            <div className={classes.set}>
              <p>{data.address}</p>
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4 className={classes.fontzz}>Contact Number</h4>
            </div>
            <div className={classes.set}>
              <p>{data.contact_number}</p>
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4 className={classes.fontzz}>Vaccine Center</h4>
            </div>
            <div className={classes.set}>
              <p>{data.contact_number}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
