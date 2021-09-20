import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import Axios from "axios";

const PieChart = () => {
  const [dose1, setDose1] = useState("");
  const [dose2, setDose2] = useState("");
  const [dose1dose2, setDose1Dose2] = useState("");
  const [users, setUsers] = useState("");
  useEffect(() => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);
    console.log(data.user_name);
    Axios.get("http://localhost:3002/monthlybookings", {
      params: { id: data.user_id },
    })
      .then((res) => {
        setDose1(res.data[0].total_bookings);
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get("http://localhost:3002/monthlycompletedbookings", {
      params: { id: data.user_id },
    })
      .then((res) => {
        setDose1Dose2(res.data[0].completed_bookings);
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get("http://localhost:3002/getuserscount")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data[0].userCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    labels: ["Total Bookings", "Completed Bookings", "Pending Bookings"],
    datasets: [
      {
        label: "# of Votes",
        data: [dose1, dose1dose2, dose1 - dose1dose2],
        backgroundColor: [
          // "rgba(0,255,255)",
          " rgba(205, 199, 24)",
          "rgba(255, 159, 64)",
          "rgba(255, 99, 132)",
        ],
        borderColor: [
          // "rgba(0,255,255, 1)",
          "rgba(205, 199, 24,1)",
          "rgba(255, 159, 64,1)",
          "rgba(255, 99, 132,1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div className="pie-chart-body2">
        <div className="heading-piechart">
          <h3>Monthly Bookings</h3>
        </div>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default PieChart;
