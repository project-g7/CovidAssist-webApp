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
import Button from "@material-ui/core/Button";
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rootAmount: {
    // margin: theme.spacing(1),
    width: "20ch",
    marginTop: "30px",
    marginLeft: "10px",
  },
  place: {
    marginTop: "20px",
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
  },
  date:{
    margin: theme.spacing(1),
    marginTop: "20px",
  }
}));

const AddVaccineForm = () => {
  const classes = useStyles();
  const [district, setDistrict] = React.useState("");
  const [vaccine, setVaccine] = React.useState("");

  const [selectedStartDate, setStartDate] = React.useState(new Date());
  const [selectedEndDate, setEndDate] = React.useState(new Date());

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
                <MenuItem value={1}>Ampara</MenuItem>
                <MenuItem value={2}>Anuradhapura</MenuItem>
                <MenuItem value={3}>Badulla</MenuItem>
                <MenuItem value={4}>Batticaloa</MenuItem>
                <MenuItem value={5}>Colombo</MenuItem>
                <MenuItem value={6}>Galle</MenuItem>
                <MenuItem value={7}>Gampaha</MenuItem>
                <MenuItem value={8}>Hambantota</MenuItem>
                <MenuItem value={9}>Jaffna</MenuItem>
                <MenuItem value={10}>Kalutara</MenuItem>
                <MenuItem value={11}>Kandy</MenuItem>
                <MenuItem value={12}>Kegalle</MenuItem>
                <MenuItem value={13}>Kilinochchi</MenuItem>
                <MenuItem value={14}>Kurunegala</MenuItem>
                <MenuItem value={15}>Mannar</MenuItem>
                <MenuItem value={16}>Matale</MenuItem>
                <MenuItem value={17}>Matara</MenuItem>
                <MenuItem value={18}>Monaragala</MenuItem>
                <MenuItem value={19}>Mullaitivu</MenuItem>
                <MenuItem value={20}>Nuwara Eliya</MenuItem>
                <MenuItem value={21}>Polonnaruwa</MenuItem>
                <MenuItem value={22}>Puttalam</MenuItem>
                <MenuItem value={23}>Ratnapura</MenuItem>
                <MenuItem value={24}>Trincomalee</MenuItem>
                <MenuItem value={25}>Vavuniya</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.place}>
              <RiIcons.RiHospitalLine style={{ marginTop: "30px" }} />
              <TextField
                id="input-grid"
                label="Place"
                className={classes.root}
              />
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
                  <MenuItem value={10}>Covisheild</MenuItem>
                  <MenuItem value={20}>Sinopharm</MenuItem>
                  <MenuItem value={30}>Sputnic V</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.amountIcon}>
              <FaIcons.FaNotesMedical style={{ marginTop: "52px" }} />
              <form
                className={classes.rootAmount}
                noValidate
                autoComplete="off"
              >
                <TextField id="standard-basic" label="Amount" />
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
            <Button variant="outlined" color="primary">
              Add Vaccine Center
            </Button>
          </div>
        </div>
        <div className={classes.map}>
          <Map updateLocation={handleLocation} />
        </div>
      </div>
    </div>
  );
};

export default AddVaccineForm;
