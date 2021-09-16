import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardCard2 = () => {
  const [completedBokkings, setcompletedBokkings] = useState(0);
  useEffect(() => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);
    console.log(data.user_name);
    axios
      .get("http://localhost:3002/getCompletedbookings",{ params: { id: data.user_id } })
      .then((res) => {
        console.log(res.data);
        setcompletedBokkings(res.data[0].completed_bookings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="card">
      <b>
        <p class="dash">Completed Bookings Today</p>
      </b>
      <b>
        <p class="infor">{completedBokkings}</p>
      </b>
    </div>
  );
};

export default DashboardCard2;
