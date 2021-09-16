import React, { useEffect, useState } from "react";
import Sidebar from "../../AdminSidebar";
import { Dialog, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import * as IoIcons from "react-icons/io5";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    tset: {
        display: "flex",
        width: "50%",
        backgroundColor: "rgb(236, 236, 236);",
        alignItems: "center",
        padding: "15px",
        color:"rgb(96, 79, 255)",
        margin: "5px",
    },
    set: {
        display: "flex",
        width: "50%",
        fontSize: "20px",
        backgroundColor: "rgb(236, 236, 236);",
        alignItems: "center",
        padding: "15px",
        margin: "5px",
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
        width:"90%",
        display:'flex',
        justifyContent: "center",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginLeft: "15px",
        
    },btn: {
        margin: theme.spacing(1),
        // margin: "30px 0px",
        display: "flex",
    },buttonStyle:{
        marginRight: " 50px",
        marginTop: "15px",
        marginBottom: "15px",
    },visibility:{
        display: "flex",
        display:"none"
    }
}));

const DisplayUnverifiedAdministrators = ()=>{
    const classes = useStyles();
    const [data,setData] = useState([]);
    const [vaccineCenter,setVaccineCenter] = useState("");
    const search = useLocation().search;
    const [user_id,setUserId] = useState("");
    const [vaccineCenterList,setVaccineCenterList ]= useState([]);
    const [vaccineCenterError, setVaccineCenterError] = useState("");
    const [open, setOpen] = React.useState(false);
    const [rejectOpen, setRejectOpen] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [rejectOpenSucces, setRejectOpenSuccess] = React.useState(false);

    useEffect(() => {
        const id = new URLSearchParams(search).get("id")
        setUserId(id);
        fetchVerifiedAdminData(id);
        

        // fetchVerifiedAdminVaccineCenter(id);
    },[]);
    useEffect(() => {
        axios.get("http://localhost:3002/getVaccineCenterList").then((res) => {
            console.log(res.data);
            setVaccineCenterList(res.data);
        });
    }, [])
    const fetchVerifiedAdminData = (id)=>{
        axios.get("http://localhost:3002/verifiedAdminDetails", {params:{ id :id}}).then((res)=>{
            // console.log(res.data[0]);
            setData(res.data[0]);
        }).catch((err)=>{
            console.log(err);
        });
    };

    const handleClick=()=>{
        let v = 0;
        if(data.user_role == "Vaccine Manager"){
            if(vaccineCenter == ""){
                v=1;
                setVaccineCenterError("Please assign a vaccine center. ")
            }else{
                setVaccineCenterError("");
            }
    
            if( v==0){
                console.log("Succccceessss");
                handleClickOpen();
            }
        }else if(data.user_role == "Contact Tracing Manager"){
            handleClickOpen();
        }
        
    }

    const handleRejectClick=()=>{
        setRejectOpen(true);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };
    const handleClickSuccessOpen = () => {
        setOpenSuccess(true);
    };
    const handleRejectClose = () => {
        setRejectOpen(false);
    };
    const handleRejectSuccessClose=()=>{
        setRejectOpenSuccess(false);
    }

    const handleRejectData  = ()=>{
        let formData ={
            id : user_id,
        };
        setRejectOpen(false);
        axios.post("http://localhost:3002/rejectAdmins",formData).then((res)=>{
            console.log(res.data);
            if(res.data == "Success"){
                setRejectOpenSuccess(true);
                console.log("data passed");
            }
            
        }).catch((err)=>{
            console.log(err);
            console.log("error in")
        });
    };
    
    const handleSubmitData  = ()=>{

        let formData ={
            id : user_id,
            place : vaccineCenter
        };
        setOpen(false);

        if(data.user_role == "Vaccine Manager"){
            axios.post("http://localhost:3002/assignAdmins",formData).then((res)=>{
            console.log(res.data);
            if(res.data == "Success"){
                handleClickSuccessOpen();
                console.log("data passed");
            }
            
            }).catch((err)=>{
                console.log(err);
                console.log("error in")
            });
        }else if(data.user_role == "Contact Tracing Manager"){
            axios.post("http://localhost:3002/acceptAdmins",formData).then((res)=>{
            console.log(res.data);
            if(res.data == "Success"){
                handleClickSuccessOpen();
                console.log("data passed");
            }
            
            }).catch((err)=>{
                console.log(err);
                console.log("error in")
            });
        }
        
        
    };
    const handleChangeVaccineCenter = (event) => {
        setVaccineCenter(event.target.value);
    };
    return(
        <div>
            <div><Sidebar /></div>
            <div className="container tab-screen">
                <div className="AddBody-center">
                    <div className="heading-center">
                        <div className={classes.icon}>
                            <Link to= "/admin/requests">
                            <IoIcons.IoArrowBack />
                            </Link>
                        </div>
                        <div>
                    <div className="heding">
                        <h3>Unverified Administrator</h3>
                    </div>
            </div>
                    </div>
                    <div className={classes.all}>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4>User Id</h4>
                            </div>
                            <div className={classes.set}>
                                {" "}
                                <p>{data.user_id}</p>
                            </div>    
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4>User Name</h4>
                                </div>
                                <div className={classes.set}>
                                    <p>{data.user_name}</p>
                                </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4>First Name</h4>
                                </div>
                                <div className={classes.set}>
                                    <p>{data.first_name}</p>
                                </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4>Last Name</h4>
                                </div>
                                <div className={classes.set}>
                                    <p>{data.last_name}</p>
                                </div>
                        </div>
                        
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4>Address</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{data.address}</p>
                            </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4>Contact Number</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{data.contact_number}</p>
                            </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4>Email</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{data.email}</p>
                            </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4>User Role</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{data.user_role}</p>
                            </div>
                        </div>
                        <div className= {classes.vset} style={{display: data.user_role == 'Vaccine Manager' ? '' : 'none' }}>
                            <div className={classes.tset}>
                                <h4>Assigned Center</h4>
                            </div>
                            <div className={classes.set}>
                            <FormControl className={classes.formControl}>
                                    <Select
                                        id="demo-simple-select"
                                        value={vaccineCenter}
                                        onChange={handleChangeVaccineCenter}
                                    >
                                        {vaccineCenterList.map((center,i)=>(
                                        <MenuItem key={i} value={center.center_id}>{center.center_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>
                        </div>
                    </div>
                    <div className={classes.btn}>
                        <div className={classes.buttonStyle}>
                            <Button className = {classes.buttonStyle} variant="outlined" color="primary" onClick={handleClick}>
                                Accept
                            </Button>
                        </div>
                        <div className={classes.buttonStyle}>
                            <Button className = {classes.buttonStyle} variant="outlined" color="primary" onClick={handleRejectClick}>
                                Reject
                            </Button>
                        </div>
                    </div>
                    
                        

                </div>
            </div>
            {/* dialog boxes for accept request */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {"Assign to vaccination center"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
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
                        Successfully assigned vaccination center.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccess} color="primary" autoFocus> Ok</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog boxes for reject request */}
            <Dialog
                open={rejectOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {"Reject request"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRejectClose} color="primary" >
                        Cancel
                    </Button>
                    <Button onClick={handleRejectData} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog 
                open={rejectOpenSucces}
                onClose={handleRejectSuccessClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Successfull!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Successfully Removed request.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRejectSuccessClose} color="primary" autoFocus> Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
        
    );
};

export default DisplayUnverifiedAdministrators