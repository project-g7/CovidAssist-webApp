import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Map from "./AddLocation";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControl2: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: "30px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    margin: theme.spacing(1),
    marginTop: "20px",
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
    // // width: '100%',
    // // flexDirection:'column',
    // justifyContent: "space-between",
  },
  map: {
    // width:'60%'
  },
  latlng:{
    margin: theme.spacing(1),
      // width: "25ch",
      marginTop: "30px",
      display:'flex',
      justifyContent: 'space-between'
      // marginLeft: "60px",
  }
}));

const AddVaccineForm = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

 let [lat,setLat] = useState(6.9022108);
 let [lng,setLng] = useState(79.8589642);
 console.log(lat+' '+lng);

 const handleLocation = (lat,lng) => {
   setLat(lat);
   setLng(lng);
   console.log(lat+' nn '+lng);
 }
  return (
    <div className='addform'>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">District</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.root}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="With a grid" />
            </Grid>
          </Grid>
        </div>
        <div className={classes.amount}>
          <div>
            <FormControl className={classes.formControl2}>
              <InputLabel id="demo-simple-select-label">Vaccine</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <form className={classes.rootAmount} noValidate autoComplete="off">
              <TextField id="standard-basic" label="Amount" />
            </form>
          </div>
        </div>
        <div>
        <form  className={classes.latlng} noValidate autoComplete="off">
          <TextField  id="standard-basic" label="Latitude" value ={lat} InputProps={{readOnly:true}} />
          <TextField  id="standard-basic" label="Longitude" value ={lng} InputProps={{readOnly:true}} />
        </form>
        </div>
      </div>
      <div className={classes.map}>
        <Map updateLocation={handleLocation} />
      </div>
    </div>
  );
};

export default AddVaccineForm;
