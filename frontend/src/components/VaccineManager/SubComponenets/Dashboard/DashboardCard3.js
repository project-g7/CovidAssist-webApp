import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardCard3 = () => {
  const [cancelled, setcancelled] = useState("");
  useEffect(() => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);
    console.log(data.user_name);
    axios
      .get("http://localhost:3002/getcancelcount", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setcancelled(res.data[0].canceled_bookings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="cardww">
      <b>
        <p class="dash">Cancelled Bookings Today</p>
      </b>
      <b>
        <p class="infor">{cancelled}</p>
      </b>
    </div>
  );
};

export default DashboardCard3;
