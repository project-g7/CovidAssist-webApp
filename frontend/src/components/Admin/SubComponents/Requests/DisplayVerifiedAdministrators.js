import React, { useEffect, useState } from "react";
import Sidebar from "../../AdminSidebar";
import { InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import * as IoIcons from "react-icons/io5";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
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
}));

const DisplayUnverifiedAdministrators = ()=>{
    const classes = useStyles();
    const [data,setData] = useState([]);
    const [centerData,setCenterData] = useState([]);
    const search = useLocation().search;
    useEffect(() => {
        const id = new URLSearchParams(search).get("id")
        fetchVerifiedAdminData(id);
        fetchVerifiedAdminVaccineCenter(id);
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
            // console.log(res.data[0]);
            setCenterData(res.data[0]);
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
                        <div className="heding">
                            <h3>Verified Administrator</h3>
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
                        <div className={classes.vset}>
                            <div className={classes.tset}>
                                <h4>Assigned Center</h4>
                            </div>
                            <div className={classes.set}>
                                <p>{centerData.assigned_center}</p>
                            </div>
                        </div>
                    </div>
                        

                </div>
            </div>
        </div>
        
    );
};

export default DisplayUnverifiedAdministrators