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
import Map from "../AddLocation";

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
}));

const AddVaccineForm = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
              value={age}
              onChange={handleChange}
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
            <RiIcons.RiHospitalLine style={{ marginTop: "32px" }} />
            <TextField id="input-grid" label="Place" className={classes.root} />
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
            <Button variant="outlined" color="primary">
              Add IoT Location
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
