import React, { useState, useEffect } from "react";
import { DateRangePicker } from "rsuite";
import "../../../styles/Datepicker.css";
import "rsuite/dist/styles/rsuite-default.css";
import "../../../styles/VaccineMangerCard.css";
import axios from "axios";
import { format } from "date-fns";
const VaccinatedCalender = () => {
  const [firstDoseCount, setFirstDoseCount] = useState(0);
  const [secondDoseCount, setSecondDoseCount] = useState(0);
  const [firstsecondDoseCount, setFirstSecondDoseCount] = useState(0);
  const [registerCount, setRegisterCount] = useState(0);
  useEffect(() => {
    getFirstDoseCount();
    getSecondDoseCount();
    getFirstSecondDoseCount();
    getRegisterCount();
  }, []);
  const getFirstDoseCount = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/firstDoseCount", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setFirstDoseCount(res.data[0].firstDose);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSecondDoseCount = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/secondDoseCount", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setSecondDoseCount(res.data[0].secondDose);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFirstSecondDoseCount = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/firstsecondDoseCount", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setFirstSecondDoseCount(res.data[0].firstsecondDose);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRegisterCount = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/registerCount", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        // console.log(new Date());
        setRegisterCount(res.data[0].registerCount);
        // var date = format(new Date(), "yyyy-MM-dd");
        // console.log(date);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {/* <div className="dates">
        <DateRangePicker />
      </div> */}
      <div
        class="rows1"
        name="viewport"
        content="width=device-width, initial-scale=1"
      >
        <div class="columns1">
          <div class="cards1">
            <h5 class="font1">1st Dose Vaccinated People</h5>
            <h4 class="font2">{firstDoseCount}</h4>
          </div>
        </div>

        <div class="columns1">
          <div class="cards1">
            <h5 class="font1">2nd Dose Vaccinated People</h5>
            <h4 class="font2">{secondDoseCount}</h4>
          </div>
        </div>

        <div class="columns1">
          <div class="cards1">
            <h5 class="font1">1st & 2nd Doses Vaccinated People</h5>
            <h4 class="font2">{firstsecondDoseCount}</h4>
          </div>
        </div>

        <div class="columns1">
          <div class="cards1">
            <h5 class="font1">
              Total No.of <br />
              Bookings
            </h5>
            <h4 class="font2">{registerCount}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinatedCalender;
