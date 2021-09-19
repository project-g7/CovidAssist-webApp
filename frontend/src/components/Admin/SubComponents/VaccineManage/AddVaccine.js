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
import Modal from "./Modal.js";

const useStyles = makeStyles((theme) => ({
  formControl2: {
    margin: theme.spacing(1),
    minWidth: 80,
    marginTop: "30px",
    marginLeft: "15px",
  },
  txt: {
    maxWidth: 120,
    minWidth: 80,
    margin: theme.spacing(1),
    marginTop: "30px",
  },
  txtv: {
    margin: theme.spacing(1),
    marginTop: "30px",
    marginLeft: "25px",
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
  const [updateData, setUpdateData] = useState([]);
  const [dose1, setDose1] = useState(0);
  const [dose2, setDose2] = useState(0);
  const [dose3, setDose3] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [vaccine, setVaccine] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  useEffect(() => {
    // loadDataOnlyOnce();
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get("http://localhost:3002/vaccines")
      .then((res) => {
        console.log(res.data);
        setVaccineList(res.data);
        // setUpdateData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeVaccine = (event) => {
    setVaccine(event.target.value);
  };

  const handleClickOpen = (event) => {
    setOpen(true);
    // console.log(event);
  };

  const handleClickSuccessOpen = () => {
    setOpenSuccess(true);
    fetchData();
    setVaccine("");
    setDose1(0);
    setDose2(0);
    setDose3(0);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitData = () => {
    let formData = {
      vaccine: vaccine,
      dose1Amount: dose1,
      dose2Amount: dose2,
      dose3Amount: dose3,
    };
    setOpen(false);
    Axios.post("http://localhost:3002/addVaccine", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data == "Success") {
          handleClickSuccessOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVaccineChange = (event) => {
    setVaccine(event.target.value);
  };

  const handleAmount1Change = (event) => {
    setDose1(event.target.value);
  };
  const handleAmount2Change = (event) => {
    setDose2(event.target.value);
  };
  const handleAmount3Change = (event) => {
    setDose3(event.target.value);
  };

  const onBtnPress = (i) => {
    console.log(i);
    // console.log(vaccineList[i]);
    setSelectedItem(i);
    setUpdateData(vaccineList[i]);
  };

  const saveModalDetails = (items) => {
    console.log("saveModel");
    console.log(items);
    // vaccineList[selectedItem] = items;
    let temparr = vaccineList;
    temparr[selectedItem] = items;
    console.log(temparr);
    setVaccineList(temparr);

    Axios.post("http://localhost:3002/updateVaccine", items)
      .then((res) => {
        console.log(res.data);
        if (res.data == "Success") {
          fetchData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let modalData = vaccineList[selectedItem];

  return (
    <div className="AddBody">
      <div className="heading">
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
                <tr key={key} >
                  <td>{value.vaccine_id}</td>
                  <td>{value.vaccine_name}</td>
                  <td>{value.dose_1_quantity}</td>
                  <td>{value.dose_2_quantity}</td>
                  <td>{value.dose_3_quantity}</td>
                  <td>
                    {/* <Button
                      variant="outlined"
                      color="primary"
                      style={{ maxHeight: "30px", minHeight: "30px" }}
                      onClick={() => {
                        handleClickOpen();
                        onBtnPress(i);
                      }}
                    >
                      Edit
                    </Button> */}
                    <button
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => onBtnPress(i)}
                    >
                      edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <Modal
            vaccine_id={updateData.vaccine_id}
            vaccine_name={updateData.vaccine_name}
            dose_1_quantity={updateData.dose_1_quantity}
            dose_2_quantity={updateData.dose_2_quantity}
            dose_3_quantity={updateData.dose_3_quantity}
            saveModalDetails={saveModalDetails}
          />
        </div>
      </div>
      <div className="add-vaccine">
        <h4 className={classes.title}>Add new Vaccine</h4>
        <div className="vaccine-inputs">
          <TextField
            id="input-grid"
            label="Vaccine Name"
            className={classes.txtv}
            onChange={handleVaccineChange}
          />
          <TextField
            id="input-grid"
            label="Dose 1 Amount"
            className={classes.txt}
            onChange={handleAmount1Change}
            value={dose1}
          />
          <TextField
            id="input-grid"
            label="Dose 2 Amount"
            className={classes.txt}
            onChange={handleAmount2Change}
            value={dose2}
          />
          <TextField
            id="input-grid"
            label="Dose 3 Amount"
            className={classes.txt}
            onChange={handleAmount3Change}
            value={dose3}
          />
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add new vaccine"}</DialogTitle>
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
              Successfully added the vaccine.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSuccess} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={classes.btn}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Vaccine
        </Button>
      </div>
    </div>
  );
};

export default AddVaccine;