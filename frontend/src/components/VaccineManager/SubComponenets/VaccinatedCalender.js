import React from "react";
import { DateRangePicker } from "rsuite";
import "../../../styles/Datepicker.css";
import "rsuite/dist/styles/rsuite-default.css";
import "../../../styles/VaccineMangerCard.css";

const VaccinatedCalender = () => {
  return (
    <div>
      <div className="dates">
        <DateRangePicker />
      </div>
      <div
        class="rows1"
        name="viewport"
        content="width=device-width, initial-scale=1"
      >
        <div class="columns1">
          <div class="cards1">
            <h5>1st Dose Vaccinated People</h5>
            <h4>1936</h4>
          </div>
        </div>

        <div class="columns1">
          <div class="cards1">
            <h5>2d Dose Vaccinated People</h5>
            <h4>1936</h4>
          </div>
        </div>

        <div class="columns1">
          <div class="cards1">
            <h5>1st & 2nd Doses Vaccinated People</h5>
            <h4>1936</h4>
          </div>
        </div>

        <div class="columns1">
          <div class="cards1">
            <h5>No.of Registered People</h5>
            <h4>1936</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinatedCalender;
