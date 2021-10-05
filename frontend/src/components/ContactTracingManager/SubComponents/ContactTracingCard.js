import React, { useEffect, useState } from "react";
import "../../../styles/ContactTracingReport.css";
import "../../../styles/VaccineMangerCard.css";
import Axios from "axios";
import {url} from "../../config"

const ContactTracingCard = () => {
  const [firstContact, setFirstContact] = useState(0);
  const [secondContact, setSecondContact] = useState(0);
  //const [firstsecondContact, setFirstSecondContact] = useState(0);
  const [registerContact, setRegisterContact] = useState(0);

  useEffect(() => {
    Axios.get(`${url.BASE_URL}/FirstContact`)
      .then((res) => {
        console.log(res.data[0].countF);
        setFirstContact(res.data[0].countF);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${url.BASE_URL}/SecondContact`)
      .then((res) => {
        console.log(res.data[0].countS);
        setSecondContact(res.data[0].countS);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${url.BASE_URL}/mobileregPeople`)
      .then((res) => {
        console.log(res.data[0].countFS);
        setRegisterContact(res.data[0].countFS);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {/* <div className="dates">
        <DateRangePicker />
      </div> */}
      <div
        class="rows12"
        name="viewport"
        // content="width=device-width, initial-scale=1"
      >
        <div class="columns1">
          <div class="cards1">
            <h5 class="font1">No. of Safe People</h5>
            <h4 class="font2">{firstContact}</h4>
          </div>
        </div>

        <div class="columns1">
          <div class="cards1">
            <h5 class="font1">No. of People Exposed to Covid-19</h5>
            <h4 class="font2">{secondContact}</h4>
          </div>
        </div>

        {/* <div class="columns1">
          <div class="cards1">
            <h5 class="font1">dddddddddd</h5>
            <h4 class="font2">123</h4>
          </div>
        </div> */}

        <div class="columns1">
          <div class="cards1">
            <h5 class="font1">No.of People Registered With CovidAssist App</h5>
            <h4 class="font2">{registerContact}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTracingCard;
