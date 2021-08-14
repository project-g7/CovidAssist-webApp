import React from "react";
import { DateRangePicker } from "rsuite";
import "../../../styles/Datepicker.css";
import "rsuite/dist/styles/rsuite-default.css";

const VaccinatedCalender = () => {
  return (
    <div className="dates">
      <DateRangePicker />
    </div>
  );
};

export default VaccinatedCalender;
