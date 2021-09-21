import React, { useState, useEffect } from "react";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  tset: {
    fontSize: 15,
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
    // backgroundColor: "rgb(236, 236, 236);",
    paddingTop: "25px",
    alignItems: "center",
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
  btn: {
    marginLeft: "900px",
    marginTop: "30px",
    display: "flex",
    alignItems: "",
  },
}));
const EditProfile = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const getSessionData = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);
    console.log(data.user_name);

    axios
      .get("http://localhost:3002/myprofile", { params: { id: data.user_id } })
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
        setFirstName(res.data[0].first_name);
        setLastName(res.data[0].last_name);
        setUsername(res.data[0].user_name);
        setNic(res.data[0].nic);
        setEmail(res.data[0].email);
        setNumber(res.data[0].contact_number);
        setAddress(res.data[0].address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveData = () => {
    let formData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      nic: nic,
      email: email,
      address: address,
      contactNumber: number,
    };
    axios
      .post("http://localhost:3002/editprofile", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getSessionData();
  };
  useEffect(() => {
    getSessionData();
  }, []);
  return (
    <div>
      <div className="AddBody-profile">
        <div className="heading">
          <div className={classes.heading}>
            <h3>Edit Profile</h3>
          </div>
        </div>
        <div className={classes.all}>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4>First Name</h4>
            </div>
            <div className={classes.set}>
              {/* <p>{data.first_name}</p> */}
              <input
                type="text"
                className="R-input"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4>Last Name</h4>
            </div>
            <div className={classes.set}>
              <input
                type="text"
                className="R-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </div>
          </div>
          {/* <div className={classes.vset}>
            <div className={classes.tset}>
              <h4>Username</h4>
            </div>
            <div className={classes.set}>
              <input
                type="text"
                className="R-input"
                placeholder="Username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
          </div> */}
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4>NIC Number</h4>
            </div>
            <div className={classes.set}>
              <input
                type="text"
                className="R-input"
                placeholder="NIC"
                //   disabled
                value={nic}
                onChange={(event) => {
                  setNic(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4>Email</h4>
            </div>
            <div className={classes.set}>
              <input
                type="text"
                className="R-input"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4>Address</h4>
            </div>
            <div className={classes.set}>
              <input
                type="text"
                className="R-input"
                placeholder="Address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={classes.vset}>
            <div className={classes.tset}>
              <h4>Contact Number</h4>
            </div>
            <div className={classes.set}>
              <input
                type="text"
                className="R-input"
                placeholder="Contact Number"
                value={number}
                onChange={(event) => {
                  setNumber(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={classes.btn}>
            <Button variant="outlined" color="primary" onClick={saveData}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
