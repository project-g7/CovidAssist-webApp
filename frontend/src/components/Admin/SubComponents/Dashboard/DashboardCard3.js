import React, { useState, useEffect } from "react";
import axios from "axios";
import {url} from "../../../config"

const DashboardCard3 = () => {
  const [requests, setRequests] = useState("");
  useEffect(() => {
    axios
      .get(`${url.BASE_URL}/getrequestcount`)
      .then((res) => {
        console.log(res.data);
        setRequests(res.data[0].requestCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="cardw">
      <b>
        <p class="dash">
          Requests to <br /> Approve
        </p>
      </b>
      <b>
        <p class="infor">{requests}</p>
      </b>
    </div>
  );
};

export default DashboardCard3;
