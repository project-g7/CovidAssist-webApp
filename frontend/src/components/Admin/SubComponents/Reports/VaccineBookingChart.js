import React from "react";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";
import "../../../../styles/VaccineBooking.css";
import VaccineBookingSearchBar from "./VaccineBookingSearchBar";
function VaccineBookingChart() {
  return (
    <div className="App">
      <div className="Title">
        <h3>Reserved Vaccines Amount for Upcoming Dates</h3>
      </div>
      {/* <div className="BarChartTitle">
        <h4>Bar Chart</h4>
      </div> */}

      <div>{/* <VaccineBookingSearchBar /> */}</div>
      <div className="MainChart">
        <Bar
          // width={"50px"}
          // height={"50px"}
          data={{
            labels: [12, 13, 14, 15],
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
      <div className="BookCard1">
        <div className="BookCard2">
          <div className="BookCardBoady1">
            <h5>Total No.of Booked Vaccines </h5>
            <h2>1966</h2>
          </div>
        </div>
        <div className="BookCard3">
          <div className="BookCardBoady1">
            <h5>Today Details</h5>
            <h5>Sinopharm </h5>
            <h5>1st Dose : 100</h5>
            <h5>2nd Dose : 100</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaccineBookingChart;
