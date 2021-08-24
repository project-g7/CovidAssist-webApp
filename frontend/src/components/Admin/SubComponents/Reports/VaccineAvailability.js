import React from "react";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";
import "../../../../styles/VaccineBooking.css";
import VaccineBookingCard1 from "./VaccineBookingCard1";
// import VaccineBookingCard2 from "./VaccineBookingCard2";
// import VaccineBookingCard3 from "./VaccineBookingCard3";
function VaccineBookingChart() {
  return (
    <div className="App">
      <div className="VaccinatedBody">
        <div className="Title">
          <h3>Vaccinated Details</h3>
        </div>
        <div className="main">
          <div className="row d-body1">
            <VaccineBookingCard1 />
            {/* <VaccineBookingCard2 />
          <VaccineBookingCard3 /> */}
          </div>
        </div>
        <div className="Main">
          {/* <div>
          <h3>Pie Chart</h3>
        </div> */}
          <Bar
            data={{
              labels: ["Oxford-AstraZeneca", "Sinopharm", "Sputnic V"],
              datasets: [
                {
                  label: "# 1st Dose",
                  data: [12000, 13000, 14000],
                  backgroundColor: [
                    "rgba(255, 99, 132)",
                    "rgba(54, 162, 235)",
                    "rgba(255, 206, 86)",
                    // "rgba(75, 192, 192)",
                    // "rgba(153, 102, 252)",
                    // "rgba(255, 159, 64)",
                    // "rgba(205, 199, 24)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    // "rgba(75, 192, 192, 1)",
                    // "rgba(153, 102, 255, 1)",
                    // "rgba(255, 159, 64, 1)",
                    // "rgba(205, 199, 24,1)",
                  ],
                  barThickness: 60,
                },
                {
                  label: "# 2nd Dose",
                  data: [5000, 6000, 9000],
                  backgroundColor: [
                    // "rgba(255, 99, 132)",
                    // "rgba(54, 162, 235)",
                    // "rgba(255, 206, 86)",
                    // "rgba(75, 192, 192)",
                    "rgba(153, 102, 252)",
                    "rgba(255, 159, 64)",
                    "rgba(205, 199, 24)",
                  ],
                  borderColor: [
                    // "rgba(255, 99, 132, 1)",
                    //"rgba(54, 162, 235, 1)",
                    // "rgba(255, 206, 86, 1)",
                    //"rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(205, 199, 24,1)",
                  ],
                  barThickness: 60,
                },
                // {
                //   label: "Sinopharm",
                //   backgroundColor: "green",
                // },
                // {
                //   label: "Sputnic V",
                //   backgroundColor: "blue",
                // },
              ],
            }}
            options={{
              maintainAspectRatio: false,
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
                    scaleLabel: {
                      labelString: "Vaccine Type",
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
                      labelString: "Total Amount",
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
          ></Bar>

          <div className="column1">
            <div className="MainPie">
              <h3>Vaccinated Age Group</h3>

              <Pie
                data={{
                  labels: [
                    "18-29 Age Group ",
                    "30-59 Age Group ",
                    "Above 50 Age",
                  ],
                  datasets: [
                    {
                      label: ["Covisheild"],
                      data: [25, 55, 15], //calculate the presantage value
                      backgroundColor: [
                        "rgba(255, 99, 132)",
                        "rgba(54, 162, 235)",
                        "rgba(255, 206, 86)",
                        "rgba(75, 192, 192)",
                        "rgba(153, 102, 252)",
                        "rgba(255, 159, 64)",
                        "rgba(205, 199, 24)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(205, 199, 24,1)",
                      ],
                      // barThickness: 100,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaccineBookingChart;
