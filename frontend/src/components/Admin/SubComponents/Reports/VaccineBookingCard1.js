import React, { useEffect, useState } from "react";
import Axios from "axios";

const VaccineBookingCard1 = () => {
  const [dose1, setDose1] = useState("");
  const [dose2, setDose2] = useState("");
  const [dose1dose2, setDose1Dose2] = useState("");
  const [register, setRegister] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3002/vaccineFirstDose")
      .then((res) => {
        console.log(res.data[0].countF);
        setDose1(res.data[0].countF);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3002/vaccineSecondDose")
      .then((res) => {
        console.log(res.data[0].countS);
        setDose2(res.data[0].countS);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3002/vaccineFirstSecondDose")
      .then((res) => {
        console.log(res.data[0].countFS);
        setDose1Dose2(res.data[0].countFS);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3002/vaccineBooking")
      .then((res) => {
        console.log(res.data[0].booking);
        setRegister(res.data[0].booking);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div
      class="row"
      name="viewport"
      content="width=device-width, initial-scale=1"
    >
      <div class="column">
        <div class="card">
          <h5>1st Dose Vaccinated People</h5>
          <p>{dose1}</p>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <h5>2d Dose Vaccinated People</h5>
          <p>{dose2}</p>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <h5>1st & 2nd Doses Vaccinated People</h5>
          <p>{dose1dose2}</p>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <h5>No.of Registered People</h5>
          <p>{register}</p>
        </div>
      </div>
    </div>
  );
};

export default VaccineBookingCard1;
