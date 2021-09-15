import React from "react";
import Sidebar from "../../AdminSidebar";
import VaccinationArea from "../../SubComponents/Reports/VaccinationArea";
const VaccinationAreas = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="container tab-screen">
        <VaccinationArea />
      </div>
    </div>
  );
};

export default VaccinationAreas;
