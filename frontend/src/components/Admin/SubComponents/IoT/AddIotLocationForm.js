import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import Map from "../AddLocation";
import {url} from "../../../config"


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControl2: {
    // margin: theme.spacing(1),
    minWidth: 120,
    marginTop: "30px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    margin: theme.spacing(1),
    // marginTop: "20px",
  },
  amount: {
    //   margin: theme.spacing(1),
    //   marginTop:'20px',
    display: "flex",
    flexDirection: "row",
  },
  rootAmount: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "30px",
      marginLeft: "60px",
    },
  },
  addform: {
    // display: "flex",
    // width: '100%',
    // // flexDirection:'column',
    // justifyContent: "space-between",
  },
  place: {
    marginTop: "15px",
  },
  latlng: {
    // margin: theme.spacing(1),
    // width: "35ch",
    marginTop: "35px",
    display: "flex",
    justifyContent: "space-between",
    //   marginLeft: "60px",
  },
  lng: {
    marginLeft: "15px",
  },
  btn: {
    margin: theme.spacing(1),
    marginTop: "50px",
  },
  latlngtxt: {
    display: "flex",
    flexDirection: "row",
  },
  districtError: {
    marginLeft: "20px",
    color: "red",
  },
}));

const AddVaccineForm = () => {
  const classes = useStyles();
  const [district, setDistrict] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [districtErr, setDistrictErr] = React.useState("");
  const [placeErr, setPlaceErr] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickSuccessOpen = () => {
    setOpenSuccess(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

    const handleSubmitData = () => {
    let formData = {
      district: district,
      place: place,
      lat: lat,
      lng: lng,
    };
    setOpen(false);
    Axios.post(`${url.BASE_URL}/addIoTLocation`, formData)
      .then((res) => {
        console.log(res.data);
        if(res.data == "Success"){
          handleClickSuccessOpen();

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    let d = 0;
    let p = 0;
    console.log(district);
    console.log(place);
    console.log(lat);
    console.log(lng);

    if (district == "") {
      setDistrictErr("Please select a district");
      d = 1;
    } else {
      d = 0;
      setDistrictErr("");
    }
    if (place == "") {
      p = 1;
      setPlaceErr("Please enter a place ");
      console.log(place);
    } else {
      p = 0;
      console.log(place);
      setPlaceErr("");
    }

    if (d == 0 && p == 0) {
      console.log("Succccceessss");
      handleClickOpen();
    } else {
      console.log("noooo");
    }
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  let [lat, setLat] = useState(6.9022108);
  let [lng, setLng] = useState(79.8589642);
  console.log(lat + " " + lng);

  const handleLocation = (lat, lng) => {
    setLat(lat);
    setLng(lng);
    console.log(lat + " nn " + lng);
  };
  return (
    <div className="AddBody">
      <div className="heading">
        <h3>Add IoT Location</h3>
      </div>
      <div className="addform">
        <div>
          <GrIcons.GrMapLocation style={{ marginTop: "32px" }} />

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={district}
              onChange={handleDistrictChange}
            >
              <MenuItem value={"Ampara"}>Ampara</MenuItem>
              <MenuItem value={"Anuradhapura"}>Anuradhapura</MenuItem>
              <MenuItem value={"Badulla"}>Badulla</MenuItem>
              <MenuItem value={"Batticaloa"}>Batticaloa</MenuItem>
              <MenuItem value={"Colombo"}>Colombo</MenuItem>
              <MenuItem value={"Galle"}>Galle</MenuItem>
              <MenuItem value={"Gampaha"}>Gampaha</MenuItem>
              <MenuItem value={"Hambantota"}>Hambantota</MenuItem>
              <MenuItem value={"Jaffna"}>Jaffna</MenuItem>
              <MenuItem value={"Kalutara"}>Kalutara</MenuItem>
              <MenuItem value={"Kandy"}>Kandy</MenuItem>
              <MenuItem value={"Kegalle"}>Kegalle</MenuItem>
              <MenuItem value={"Kilinochchi"}>Kilinochchi</MenuItem>
              <MenuItem value={"Kurunegala"}>Kurunegala</MenuItem>
              <MenuItem value={"Mannar"}>Mannar</MenuItem>
              <MenuItem value={"Matale"}>Matale</MenuItem>
              <MenuItem value={"Matara"}>Matara</MenuItem>
              <MenuItem value={"Monaragala"}>Monaragala</MenuItem>
              <MenuItem value={"Mullaitivu"}>Mullaitivu</MenuItem>
              <MenuItem value={"Nuwara Eliya"}>Nuwara Eliya</MenuItem>
              <MenuItem value={"Polonnaruwa"}>Polonnaruwa</MenuItem>
              <MenuItem value={"Puttalam"}>Puttalam</MenuItem>
              <MenuItem value={"Ratnapura"}>Ratnapura</MenuItem>
              <MenuItem value={"Trincomalee"}>Trincomalee</MenuItem>
              <MenuItem value={"Vavuniya"}>Vavuniya</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.districtError}>{districtErr}</div>
          <div className={classes.place}>
            <RiIcons.RiHospitalLine style={{ marginTop: "32px" }} />
            <TextField
              id="input-grid"
              label="Place"
              className={classes.root}
              value={place}
              onChange={handlePlaceChange}
            />
          </div>
          <div className={classes.districtError}>{placeErr}</div>

          <div>
            <form className={classes.latlng} noValidate autoComplete="off">
              <div className={classes.latlngtxt}>
                <GrIcons.GrLocationPin style={{ marginTop: "26px" }} />
                <TextField
                  id="standard-basic"
                  label="Latitude"
                  value={lat}
                  InputProps={{ readOnly: true }}
                  style={{ marginLeft: "10px", width: "17ch" }}
                />
              </div>
              <div className={classes.latlngtxt}>
                <GrIcons.GrLocationPin
                  style={{ marginTop: "26px", marginLeft: "15px" }}
                />
                <TextField
                  id="standard-basic"
                  label="Longitude"
                  value={lng}
                  InputProps={{ readOnly: true }}
                  style={{ marginLeft: "8px", width: "17ch" }}
                />
              </div>
            </form>
          </div>
          <div className={classes.btn}>
            <Button variant="outlined" color="primary" onClick={handleClick}>
              Add IoT Location
            </Button>
          </div>
        </div>
        <div className={classes.map}>
          <Map updateLocation={handleLocation} />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add new IoT location"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitData} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Successfull!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Successfully added the IoT Location.
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

export default AddVaccineForm;
