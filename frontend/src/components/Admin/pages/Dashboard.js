import React from "react";
import "../../../styles/AdminDashboard.css";
import DashboardCard1 from "../SubComponents/Dashboard/DashboardCard1";
import DashboardCard2 from "../SubComponents/Dashboard/DashboardCard2";
import DashboardCard3 from "../SubComponents/Dashboard/DashboardCard3";
import DashboardCard4 from "../SubComponents/Dashboard/DashboardCard4";
import LineGraph from "../SubComponents/Dashboard/LineGraph";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row d-body">
        {/* <div className = 'd-right'> */}
        <DashboardCard1 />
        {/* </div>    
            <div>     */}
        <DashboardCard2 />
        {/* </div>
            <div> */}
        <DashboardCard3 />
        {/* </div>     */}
      </div>
      <div className="container tab-screen">
        <LineGraph />
      </div>
    </div>
  );
};

export default Dashboard;
