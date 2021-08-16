import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Mobile App users",
      data: [33, 53, 65, 81, 90, 100],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Bookings for 1st dose",
      data: [20, 29, 35, 45, 54, 76],
      fill: false,
      borderColor: "#742774"
    },
     {
      label: "Bookings for 2nd dose",
      data: [18, 25, 30, 44, 50, 70],
      fill: false,
      borderColor: '#CE35EC'
    }
  ]
};

export default function LineGraph() {
  return (
    <div className="dashboard-line-chart">
      <Line data={data} />
    </div>
  );
}
