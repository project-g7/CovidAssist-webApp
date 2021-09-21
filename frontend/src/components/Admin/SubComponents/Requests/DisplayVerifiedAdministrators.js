import React, { useEffect, useState } from "react";
import Sidebar from "../../AdminSidebar";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import * as IoIcons from "react-icons/io5";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
// import  Dialog from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Dialog } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    tset: {
        display: "flex",
        width: "50%",
        backgroundColor: "rgb(236, 236, 236);",
        alignItems: "center",
        padding: "15px",
        color:"blue",
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
        width:"90%",
        display:'flex',
        justifyContent: "center",
    },buttonStyle:{
        marginRight: " 50px",
        marginTop: "15px",
        marginBottom: "15px",
    },fontsist: {
        fontSize: "20px",
    },
    btn: {
        // margin: theme.spacing(1),
        // margin: "30px 0px",
        marginLeft:"700px",
        width: '40%',
        display: "flex",
        justifyContent:"space-around"
    },
}));

const DisplayUnverifiedAdministrators = ()=>{
    const classes = useStyles();
    const [data,setData] = useState([]);
    const [centerData,setCenterData] = useState([]);
    const [assignedCenter, setAssignedCenter] = useState("");
    const [assignedCenterId, setAssignedCenterId] = useState("");
    const search = useLocation().search;
    const [open, setOpen] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [user_id,setUserId] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };
    const handleOpenSuccess = () => {
        setOpenSuccess(true);
    };
    const handleSubmitData=()=>{
        let formData={
            id : user_id,
            center_id : assignedCenterId,
        }
        setOpen(false);

        axios.post("http://localhost:3002/removeVaccineManager",formData).then((res)=>{
            console.log(res.data);
            if(res.data == "Success"){
                console.log("data passed");
                handleOpenSuccess(true);
            }
            }).catch((err)=>{
                console.log(err);
                console.log("error in")
            });
    }
    
    useEffect(() => {
        const id = new URLSearchParams(search).get("id")
        setUserId(id);
        fetchVerifiedAdminData(id);
        fetchVerifiedAdminVaccineCenter(id);
        console.log(centerData.center_id);
    },[]);

    const fetchVerifiedAdminData = (id)=>{
        axios.get("http://localhost:3002/verifiedAdminDetails", {params:{ id :id}}).then((res)=>{
            // console.log(res.data[0]);
            setData(res.data[0]);
        }).catch((err)=>{
            console.log(err);
        });
    };
    const fetchVerifiedAdminVaccineCenter = (id)=>{
        axios.get("http://localhost:3002/adminVaccineCenter", {params:{ id :id}}).then((res)=>{
            setCenterData(res.data[0]);
            setAssignedCenter(res.data[0].assigned_center);
            setAssignedCenterId(res.data[0].center_id);
        }).catch((err)=>{
            console.log(err);
        });
        
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
                        <div className={classes.heading}>
                            <h3>Verified Administrator</h3>
                        </div>
                    </div>
                    <div className={classes.all}>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4 className={classes.fontsist}>User Id</h4>
                            </div>
                            <div className={classes.set}>
                                {" "}
                                <p>{data.user_id}</p>
                            </div>    
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4  className={classes.fontsist}>User Name</h4>
                                </div>
                                <div className={classes.set}>
                                    <p>{data.user_name}</p>
                                </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4  className={classes.fontsist}>First Name</h4>
                                </div>
                                <div className={classes.set}>
                                    <p>{data.first_name}</p>
                                </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4  className={classes.fontsist}>Last Name</h4>
                                </div>
                                <div className={classes.set}>
                                    <p>{data.last_name}</p>
                                </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4  className={classes.fontsist}>Address</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{data.address}</p>
                            </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4  className={classes.fontsist}>Contact Number</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{data.contact_number}</p>
                            </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4  className={classes.fontsist}>Email</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{data.email}</p>
                            </div>
                        </div>
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4  className={classes.fontsist}>User Role</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{data.user_role}</p>
                            </div>
                        </div>
                        <div className={classes.vset} style={{display: data.user_role == 'Vaccine Manager' ? '' : 'none' }}>
                            <div className={classes.tset}>
                                <h4  className={classes.fontsist}>Assigned Center</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{assignedCenter}</p>
                            </div>
                        </div>
                    </div>
                    <div className= {classes.btn} style={{display: data.user_role == 'Vaccine Manager' ? '' : 'none' }}>
                    <Button className = {classes.buttonStyle} variant="outlined" color="primary" onClick={handleClickOpen} >
                            Remove from vaccine center
                        </Button>
                    </div>    

                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {"Remove from vaccine center"}
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
                        "Successfully removed vaccine center"
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccess} color="primary" autoFocus> Ok</Button>
                </DialogActions>
            </Dialog>
            
        </div>
  );
};

export default DisplayUnverifiedAdministrators;
