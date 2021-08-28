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
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Map from "../AddLocation";
import "../../../../styles/VaccinationAreas.css";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: "15px",
  },
  formControl2: {
    margin: theme.spacing(1),
    minWidth: 80,
    marginTop: "30px",
    marginLeft: "15px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    marginLeft: "15px",
  },
  amount: {
    //   margin: theme.spacing(1),
    //   marginTop:'20px',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rootAmount: {
    // margin: theme.spacing(1),
    width: "14ch",
    marginTop: "30px",
    marginLeft: "10px",
  },
  place: {
    marginTop: "6px",
  },
  map: {
    // width:'60%'
    marginLeft: "60px",
  },
  latlng: {
    // margin: theme.spacing(1),
    // width: "50ch",
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    // marginLeft: "60px",
  },
  btn: {
    margin: theme.spacing(1),
    marginTop: "50px",
  },
  latlngtxt: {
    display: "flex",
    flexDirection: "row",
  },
  addform: {
    width: "100%",
  },
  locationForm: {
    width: "80%",
  },
  amountIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    margin: theme.spacing(1),
    marginTop: "20px",
  },
  districtError: {
    marginLeft: "30px",
    color: "red",
  },
  displace: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const AddVaccineForm = () => {
  const classes = useStyles();
  const [district, setDistrict] = React.useState("");
  const [vaccine, setVaccine] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [amount1, setAmount1] = React.useState(0);
  const [amount2, setAmount2] = React.useState(0);
  const [amount3, setAmount3] = React.useState(0);
  const [districtErr, setDistrictErr] = React.useState("");
  const [placeErr, setPlaceErr] = React.useState("");
  const [vaccineErr, setVaccineErr] = React.useState("");

  const [selectedStartDate, setStartDate] = React.useState(new Date());
  const [selectedEndDate, setEndDate] = React.useState(new Date());

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
      vaccine: vaccine,
      dose1Amount: amount1,
      dose2Amount: amount2,
      dose3Amount: amount3,
      lat: lat,
      lng: lng,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    };
    setOpen(false);
    Axios.post("http://localhost:3002/addVaccineCenter", formData)
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

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };
  const handleChangeVaccine = (event) => {
    setVaccine(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const handleAmount1Change = (event) => {
    setAmount1(event.target.value);
  };
  const handleAmount2Change = (event) => {
    setAmount2(event.target.value);
  };
  const handleAmount3Change = (event) => {
    setAmount3(event.target.value);
  };

  const handleClick = () => {
    let d = 0;
    let p = 0;
    let v = 0;
    console.log(district);
    console.log(place);
    console.log(vaccine);
    console.log(lat);
    console.log(lng);
    console.log(selectedStartDate);
    console.log(vaccine);
    console.log(selectedEndDate);
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
    if (vaccine == "") {
      v = 1;
      setVaccineErr("Please select a vaccine");
    } else {
      v = 0;
      setVaccineErr("");
    }

    if (d == 0 && p == 0 && v == 0) {
      console.log("Succccceessss");
      handleClickOpen();
    } else {
      console.log("noooo");
    }
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
      <div className="heding">
        <h3>Add Vaccine Center</h3>
      </div>
      <div className="addform">
        <div className="locationForm">
          <div className={classes.displace}>
            <div>
              <GrIcons.GrMapLocation style={{ marginTop: "32px" }} />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">District</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={district}
                  onChange={handleChangeDistrict}
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
            </div>
            <div className={classes.place}>
              <RiIcons.RiHospitalLine style={{ marginTop: "30px" }} />
              <TextField
                id="input-grid"
                label="Place"
                className={classes.root}
                value={place}
                onChange={handlePlaceChange}
              />
              <div className={classes.districtError}>{placeErr}</div>
            </div>
          </div>
          <div className={classes.amount}>
            <div>
              <GiIcons.GiLoveInjection style={{ marginTop: "54px" }} />
              <FormControl className={classes.formControl2}>
                <InputLabel id="demo-simple-select-label">Vaccine</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={vaccine}
                  onChange={handleChangeVaccine}
                >
                  <MenuItem value={"Oxford-AstraZeneca"}>Oxford-AstraZeneca</MenuItem>
                  <MenuItem value={"Sinopharm"}>Sinopharm</MenuItem>
                  <MenuItem value={"Sputnic V"}>Sputnic V</MenuItem>
                </Select>
              </FormControl>
              <div className={classes.districtError}>{vaccineErr}</div>
            </div>
            <div className={classes.amountIcon}>
              <FaIcons.FaNotesMedical
                style={{ marginTop: "52px", marginRight: "-15px" }}
              />
              <form
                className={classes.rootAmount}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Dose 1 Amount"
                  value={amount1}
                  onChange={handleAmount1Change}
                />
              </form>
              <FaIcons.FaNotesMedical
                style={{ marginTop: "52px", marginRight: "-15px" }}
              />

              <form
                className={classes.rootAmount}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Dose 2 Amount"
                  value={amount2}
                  onChange={handleAmount2Change}
                />
              </form>
              <FaIcons.FaNotesMedical
                style={{ marginTop: "52px", marginRight: "-15px" }}
              />

              <form
                className={classes.rootAmount}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Dose 3 Amount"
                  value={amount3}
                  onChange={handleAmount3Change}
                />
              </form>
            </div>
          </div>
          <div>
            <form className={classes.latlng} noValidate autoComplete="off">
              <div className={classes.latlngtxt}>
                <GrIcons.GrLocationPin style={{ marginTop: "26px" }} />
                <TextField
                  id="standard-basic"
                  label="Latitude"
                  value={lat}
                  InputProps={{ readOnly: true }}
                  style={{ marginLeft: "15px", width: "20ch" }}
                />
              </div>
              <div className={classes.latlngtxt}>
                <GrIcons.GrLocationPin style={{ marginTop: "26px" }} />
                <TextField
                  id="standard-basic"
                  label="Longitude"
                  value={lng}
                  InputProps={{ readOnly: true }}
                  style={{ marginLeft: "15px", width: "20ch" }}
                />
              </div>
            </form>
          </div>
          <div className={classes.date}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Select Start Date"
                format="MM/dd/yyyy"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Select End Date"
                format="MM/dd/yyyy"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={{ marginLeft: "20px" }}
              />
            </MuiPickersUtilsProvider>
          </div>

          <div className={classes.btn}>
            <Button variant="outlined" color="primary" onClick={handleClick}>
              Add Vaccine Center
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
          {"Add new vaccine center"}
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

export default AddVaccineForm;
