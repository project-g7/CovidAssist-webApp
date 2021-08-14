import React from "react";
import "../../../styles/AdminDashboard.css";
import DashboardCard1 from "../SubComponents/DashboardCard1";
import DashboardCard2 from "../SubComponents/DashboardCard2";
import DashboardCard3 from "../SubComponents/DashboardCard3";
import DashboardCard4 from "../SubComponents/DashboardCard4";

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
    </div>
  );
};

export default Dashboard;
