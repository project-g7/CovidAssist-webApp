import React,{useEffect,useState} from "react";
import "../../../styles/AdminDashboard.css";
import DashboardCard1 from "../SubComponents/Dashboard/DashboardCard1";
import DashboardCard2 from "../SubComponents/Dashboard/DashboardCard2";
import DashboardCard3 from "../SubComponents/Dashboard/DashboardCard3";
import DashboardCard4 from "../SubComponents/Dashboard/DashboardCard4";
import LineGraph from "../SubComponents/Dashboard/LineGraph";

const Dashboard = () => {

  const getSessionData = () => {
    let data = sessionStorage.getItem('sessionStorageData');
    data = JSON.parse(data);
    console.log(data);
  }

  useEffect(()=>{
    getSessionData();
  },[])
  return (
    <div className="container">
      <div className="row d-body">
        <DashboardCard4 />
        <DashboardCard1 />  
        <DashboardCard2 />
        <DashboardCard3 />
      </div>
      <div className="container tab-screen">
        <LineGraph />
      </div>
    </div>
  );
};

export default Dashboard;
