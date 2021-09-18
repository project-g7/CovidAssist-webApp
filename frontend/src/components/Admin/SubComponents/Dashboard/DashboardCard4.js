import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardCard4 = () => {
  const [users, setUsers] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3002/getuserscount")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data[0].userCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="cardw">
      <b>
        <p class="dash">Total Mobile App users</p>
      </b>
      <b>
        <p class="infor">{users}</p>
      </b>
    </div>
  );
};

export default DashboardCard4;
