import React, { useState, useEffect } from "react";
import axios from "axios";
import {url} from "../../../config"

const DashboardCard4 = () => {
  const [vaccine_name, setvaccine_name] = useState("");
  useEffect(() => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);
    console.log(data.user_name);
    axios
      .get(`${url.BASE_URL}/getVaccine`, { params: { id: data.user_id } })
      .then((res) => {
        console.log(res.data);
        setvaccine_name(res.data[0].vaccine_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="cardww">
      <b>
        <p class="dash">Vaccine Name</p>
      </b>
      <b>
        <h1 class="infor">{vaccine_name}</h1>
      </b>
    </div>
  );
};

export default DashboardCard4;
