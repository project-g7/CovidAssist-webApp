import React from "react";
// import { Line } from "react-chartjs-2";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";


const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    
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
      <Bar
            // width={"50px"}
            // height={"50px"}
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jan", "Feb", "Mar", "Apr", "May", "Jun","Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Booked",
                  data: [200, 300, 350, 380],
                  backgroundColor: "rgba(54, 162, 235)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  barThickness: 60,
                },
                {
                  label: "Available",
                  data: [50, 100, 50, 25],
                  backgroundColor: "rgba(255, 159, 64)",
                  borderColor: "rgba(255, 159, 64, 1)",
                  barThickness: 60,
                },
              ],
            }}
            options={{
              maintainAspectRatio: true,
              tooltips: {
                mode: "index",
                callbacks: {
                  label: function (toolTipItem) {
                    return "Revenue: $" + toolTipItem.value;
                  },
                },
              },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      color: "cyan",
                    },
                    grid: {
                      offset: true,
                    },
                    scaleLabel: {
                      labelString: "Date",
                      display: true,
                      fontColor: "blue",
                      fontSize: 20,
                    },
                    ticks: {
                      fontColor: "green",
                       autoSkip: false,
                      maxRotation: 90,
                     minRotation: 0
                    },
                  },
                ],
                yAxes: [
                  {
                    gridLines: {
                      color: "cyan",
                    },
                    scaleLabel: {
                      labelString: "Number of Vaccines",
                      display: true,
                      fontColor: "blue",
                      fontSize: 20,
                    },
                    ticks: {
                      beginAtZero: true,
                      fontColor: "green",
                    },
                  },
                ],
              },
            }}
          />
    </div>
  );
}
