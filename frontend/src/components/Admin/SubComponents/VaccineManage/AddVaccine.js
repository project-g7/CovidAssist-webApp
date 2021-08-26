import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import * as RiIcons from "react-icons/ri";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  formControl2: {
    margin: theme.spacing(1),
    minWidth: 80,
    marginTop: "30px",
    marginLeft: "15px",
  },
  txt: {
    margin: theme.spacing(1),
    marginTop: "30px",
  },
  title: {
    margin: theme.spacing(1),
    marginTop: "20px",
    marginLeft: "35px",
  },
  btn: {
    margin: theme.spacing(1),
    marginTop: "50px",
    marginLeft: "35px",
  },
}));

const AddVaccine = () => {
  const classes = useStyles();

  const [vaccineList, setVaccineList] = useState([]);
  const [vaccineName, setVaccineName] = useState("");
  const [dose1, setDose1] = useState(0);
  const [dose2, setDose2] = useState(0);
  const [dose3, setDose3] = useState(0);
  const [vaccine, setVaccine] = React.useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // loadDataOnlyOnce();
    Axios.get("http://localhost:3002/vaccines")
      .then((res) => {
        console.log(res.data);
        setVaccineList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeVaccine = (event) => {
    setVaccine(event.target.value);
  };

  const handleClickOpen = (event) => {
    setOpen(true);
    console.log(event);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="AddBody">
      <div className="heding">
        <h3>Vaccines</h3>
      </div>
      <div className="table_container">
        <table>
          <thead>
            <th>Vaccine ID</th>
            <th>Vaccien Name</th>
            <th>Dose 1 Quantity</th>
            <th>Dose 2 Quantity</th>
            <th>Dose 3 Quantity</th>
            <th></th>
          </thead>
          <tbody>
            {vaccineList.map((value, i) => {
              const key = `vaccine${i}`;
              return (
                <tr key={key}>
                  <td>{value.vaccine_id}</td>
                  <td>{value.vaccine_name}</td>
                  <td>{value.dose_1_quantity}</td>
                  <td>{value.dose_2_quantity}</td>
                  <td>{value.dose_3_quantity}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ maxHeight: "30px", minHeight: "30px" }}
                      onClick={handleClickOpen}
                    >
                      Edit
                    </Button>
                  </td>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Edit Vaccien Details
                    </DialogTitle>
                    <DialogContent>
                      <TextField id="name" label="Vaccine Name" value={value.vaccine_name}/>
                      <TextField id="name" label="Dose 1 Quantity" value={value.dose_1_quantity}/>
                      <TextField id="name" label="Dose 2 Quantity" value={value.dose_2_quantity}/>
                      <TextField id="name" label="Dose 3 Quantity" value={value.dose_3_quantity}/>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        Subscribe
                      </Button>
                    </DialogActions>
                  </Dialog>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="add-vaccine">
        <h4 className={classes.title}>Add new Vaccine</h4>
        <div className="vaccine-inputs">
          <TextField
            id="input-grid"
            label="Vaccine Name"
            className={classes.txt}
          />

          <FormControl className={classes.formControl2}>
            <InputLabel id="demo-simple-select-label">Dose</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={vaccine}
              onChange={handleChangeVaccine}
            >
              <MenuItem value={10}>Dose 1</MenuItem>
              <MenuItem value={20}>Dose 2</MenuItem>
              <MenuItem value={30}>Dose 3</MenuItem>
            </Select>
          </FormControl>
          <TextField id="input-grid" label="Amount" className={classes.txt} />
        </div>
      </div>
      <div className={classes.btn}>
        <Button variant="outlined" color="primary">
          Add Vaccine
        </Button>
      </div>
    </div>
  );
};

export default AddVaccine;
