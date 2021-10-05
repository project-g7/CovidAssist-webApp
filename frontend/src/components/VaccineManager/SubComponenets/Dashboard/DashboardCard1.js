import React, { useState, useEffect } from "react";
import axios from "axios";
import {url} from "../../../config"

const DashboardCard1 = () => {
  const [bookings, setBookings] = useState(0);
  useEffect(() => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);
    console.log(data.user_name);
    axios
      .get(`${url.BASE_URL}/bookingcount`, {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setBookings(res.data[0].total_bookings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="cardww">
      <b>
        <p class="dash">Total Bookings Today</p>
      </b>
      <b>
        <p class="infor">{bookings}</p>
      </b>
    </div>
  );
};

export default DashboardCard1;
