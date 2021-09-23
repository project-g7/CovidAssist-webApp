import React, { useState, useEffect } from "react";
import axios from "axios";
import {url} from "../../../config"
const DashboardCard1 = () => {
  const [centers, setCenters] = useState(0);
  useEffect(() => {
    axios
      .get(`${url.BASE_URL}/getcentercount`)
      .then((res) => {
        console.log(res.data);
        setCenters(res.data[0].centerCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="cardw">
      <b>
        <p class="dash">Total Vaccine Centers</p>
      </b>
      <b>
        <p class="infor">{centers}</p>
      </b>
    </div>
  );
};

export default DashboardCard1;
