import React from "react";
import "../../../styles/VaccineManagerChart.css";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";
import VaccinatedCalender from "./VaccinatedCalender";
const VaccinatedDetailsChart = () => {
  return (
    <div className="App">
      <div className="Title1">
        <div className="HeadLine">
          <h3>Vaccinated Details in District </h3>

          <div className="subtitle">
            <h3>Vaccinated Details in District</h3>
          </div>
        </div>
        <div>
          <VaccinatedCalender />
        </div>

        <div className="VaccineChart">
          {/* <div>
          <h3>Pie Chart</h3>
        </div> */}
          <Bar
            data={{
              labels: ["Covisheild", "Sinopharm", "Sputnic V"],
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
                  label: "# 2n Dose",
                  data: [2000, 3000, 4000],
                  backgroundColor: [
                    // "rgba(255, 99, 132)",
                    // "rgba(54, 162, 235)",
                    "rgba(75, 192, 192)",
                    "rgba(255, 159, 64)",
                    //"rgba(255, 206, 86)",
                    "rgba(153, 102, 252)",
                    // "rgba(255, 159, 64)",
                    // "rgba(205, 199, 24)",
                  ],
                  borderColor: [
                    // "rgba(255, 99, 132, 1)",
                    // "rgba(54, 162, 235, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 159, 64, 1)",
                    // "rgba(255, 206, 86, 1)",

                    "rgba(153, 102, 255, 1)",
                    // "rgba(255, 159, 64, 1)",
                    // "rgba(205, 199, 24,1)",
                  ],
                  barThickness: 60,
                },
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
          <div className="PieChart1">
            <div>
              <h4>Vaccinated Age Group</h4>

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
                        // "rgba(54, 162, 235)",
                        // "rgba(255, 206, 86)",
                        // "rgba(75, 192, 192)",
                        "rgba(153, 102, 252)",
                        //"rgba(255, 159, 64)",
                        "rgba(205, 199, 24)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        // "rgba(54, 162, 235, 1)",
                        //  "rgba(255, 206, 86, 1)",
                        // "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        // "rgba(255, 159, 64, 1)",
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
};

export default VaccinatedDetailsChart;
