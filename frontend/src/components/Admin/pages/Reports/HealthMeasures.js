import React from "react";
import Sidebar from "../../AdminSidebar";
import HealthMeasuresTabScreen from "../../SubComponents/Reports/HealthMeasuresTabScreen";
const HealthMeasures = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="container tab-screen">
        <HealthMeasuresTabScreen />
      </div>
    </div>
  );
};

export default HealthMeasures;
