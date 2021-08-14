import React from "react";
import Sidebar from "../../AdminSidebar";
import VaccineBookingTabScreen from "../../SubComponents/Reports/VaccineBookingTabScreen";
export const VaccineBooking = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="container tab-screen">
        <VaccineBookingTabScreen />
      </div>
    </div>
  );
};
