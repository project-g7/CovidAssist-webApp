import React from "react";
import Sidebar from "../ContactTracingSidebar";

import ContactTracingChart from "../SubComponents/ContactTracingChart";

const contacttracingReport = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <ContactTracingChart />
      </div>
    </div>
  );
};

export default contacttracingReport;
