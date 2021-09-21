import React from "react";
import Sidebar from "../ContactTracingSidebar";
//import ContactTracingCard from "../SubComponents/ContactTracingCard";
import ContactTracingChart from "../SubComponents/ContactTracingChart";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>

      <div className="container tab-screen">
        <ContactTracingChart />
      </div>
    </div>
  );
};

export default Dashboard;
