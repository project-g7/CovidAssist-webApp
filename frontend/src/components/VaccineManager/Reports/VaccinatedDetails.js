import React from "react";
import Sidebar from "../VaccineSidebar";
import VaccinatedDetailsChart from "../SubComponenets/VaccinatedDetailsChart";
const VaccinatedDetails = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="container tab-screen">
        <VaccinatedDetailsChart />
      </div>
    </div>
  );
};

export default VaccinatedDetails;
