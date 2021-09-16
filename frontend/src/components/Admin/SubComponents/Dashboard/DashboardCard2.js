import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardCard2 = () => {
  const [iotPlaces, setIotPlaces] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3002/getiotcount")
      .then((res) => {
        console.log(res.data);
        setIotPlaces(res.data[0].iotCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="cardw">
      <b>
        <p class="dash">
          Public IOT <br />
          Places
        </p>
      </b>
      <b>
        <p class="infor">{iotPlaces}</p>
      </b>
    </div>
  );
};

export default DashboardCard2;
