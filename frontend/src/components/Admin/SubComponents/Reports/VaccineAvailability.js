import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";
import "../../../../styles/VaccineBooking.css";
import VaccineBookingCard1 from "./VaccineBookingCard1";
import Axios from "axios";

// import VaccineBookingCard2 from "./VaccineBookingCard2";
// import VaccineBookingCard3 from "./VaccineBookingCard3";
function VaccineBookingChart() {
  const [sputnikVdose1, setSputnikVdose1] = useState("");
  const [sputnikVdose2, setSputnikVdose2] = useState("");
  const [astraZeneca1, setAstraZeneca1] = useState("");
  const [astraZeneca2, setAstraZeneca2] = useState("");
  const [sinopharm1, setSinopharm1] = useState("");
  const [sinopharm2, setSinopharm2] = useState("");

  const [pieChart1, setPieChart1] = useState(0);
  const [pieChart2, setPieChart2] = useState(0);
  const [pieChart3, setPieChart3] = useState(0);
  const [regPeople, setRegPeople] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3002/sputnikVfirstDose")
      .then((res) => {
        console.log(res.data[0].sputnikV1);
        setSputnikVdose1(res.data[0].sputnikV1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/sputnikVsecondDose")
      .then((res) => {
        console.log(res.data[0].sputnikV2);
        setSputnikVdose2(res.data[0].sputnikV2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/astraZenecaFirstDose")
      .then((res) => {
        console.log(res.data[0].astra1);
        setAstraZeneca1(res.data[0].astra1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/astraZenecaSecondDose")
      .then((res) => {
        console.log(res.data[0].astra2);
        setAstraZeneca2(res.data[0].astra2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/sinopharmFirstDose")
      .then((res) => {
        console.log(res.data[0].sinopharm1);
        setSinopharm1(res.data[0].sinopharm1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/sinopharmSecondDose")
      .then((res) => {
        console.log(res.data[0].sinopharm2);
        setSinopharm2(res.data[0].sinopharm2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/PieChart1")
      .then((res) => {
        console.log(res.data[0].piechart1);
        setPieChart1(res.data[0].piechart1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/PieChart2")
      .then((res) => {
        console.log(res.data[0].pieChart2);
        setPieChart2(res.data[0].piechart2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3002/PieChart3")
      .then((res) => {
        console.log(res.data[0].piechart3);
        setPieChart3(res.data[0].piechart3);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/VaccineregPeople")
      .then((res) => {
        console.log(res.data[0].reg);
        setRegPeople(res.data[0].reg);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
          {/* { <div>
          <h3>Pie Chart</h3>
        </div> } */}
          <Bar
            data={{
              labels: ["AstraZeneca", "Sinopharm", "Pfizer"],
              datasets: [
                {
                  label: "# 1st Dose",
                  data: [astraZeneca1, sinopharm1, sputnikVdose1],
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
                  data: [astraZeneca2, sinopharm2, sputnikVdose2],
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
                    "Above 60 Age",
                  ],
                  datasets: [
                    {
                      label: ["Covisheild"],
                      data: [pieChart1, pieChart2, pieChart3], //calculate the presantage value
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
