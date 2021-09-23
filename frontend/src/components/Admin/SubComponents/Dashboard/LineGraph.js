import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";
import Axios from "axios";
import {url} from "../../../config"

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Bookings for 1st dose",
      data: [20, 29, 35, 45, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
    {
      label: "Bookings for 2nd dose",
      data: [18, 25, 30, 44, 50, 70],
      fill: false,
      borderColor: "#CE35EC",
    },
  ],
};

export default function LineGraph() {
  const [sputnikVdose1, setSputnikVdose1] = useState("");
  const [sputnikVdose2, setSputnikVdose2] = useState("");
  const [astraZeneca1, setAstraZeneca1] = useState("");
  const [astraZeneca2, setAstraZeneca2] = useState("");
  const [sinopharm1, setSinopharm1] = useState("");
  const [sinopharm2, setSinopharm2] = useState("");

  useEffect(() => {
    Axios.get(`${url.BASE_URL}/sputnikVfirstDose`)
      .then((res) => {
        console.log(res.data[0].sputnikV1);
        setSputnikVdose1(res.data[0].sputnikV1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${url.BASE_URL}/sputnikVsecondDose`)
      .then((res) => {
        console.log(res.data[0].sputnikV2);
        setSputnikVdose2(res.data[0].sputnikV2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${url.BASE_URL}/astraZenecaFirstDose`)
      .then((res) => {
        console.log(res.data[0].astra1);
        setAstraZeneca1(res.data[0].astra1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${url.BASE_URL}/astraZenecaSecondDose`)
      .then((res) => {
        console.log(res.data[0].astra2);
        setAstraZeneca2(res.data[0].astra2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${url.BASE_URL}/sinopharmFirstDose`)
      .then((res) => {
        console.log(res.data[0].sinopharm1);
        setSinopharm1(res.data[0].sinopharm1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${url.BASE_URL}/sinopharmSecondDose`)
      .then((res) => {
        console.log(res.data[0].sinopharm2);
        setSinopharm2(res.data[0].sinopharm2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="dashboard-line-chart-admin">
      <Bar
        data={{
          labels: ["Oxford-AstraZeneca", "Sinopharm", "Sputnic V"],
          datasets: [
            {
              label: "# 1st Dose",
              data: [astraZeneca1, sinopharm1, sputnikVdose1],
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                "rgba(255, 99, 132)",
                // "rgba(54, 162, 235)",
                // "rgba(255, 206, 86)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              barThickness: 40,
              categorySpacing: 0,
            },
            {
              label: "# 2nd Dose",
              data: [astraZeneca2, sinopharm2, sputnikVdose2],
              backgroundColor: [
                "rgba(153, 102, 252)",
                "rgba(153, 102, 252)",
                "rgba(153, 102, 252)",
                // "rgba(255, 159, 64)",
                // "rgba(205, 199, 24)",
              ],
              borderColor: [
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(205, 199, 24,1)",
              ],
              barThickness: 40,
              categorySpacing: 0,
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
          plugins: {
            title: {
              display: true,
              text: "Vaccinated Details",
              font: {
                size:20
              }
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
                  fontSize: 25,
                },
                ticks: {
                  fontColor: "green",
                },
                categorySpacing: 20,
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
                  fontSize: 25,
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: "green",
                },
                // barPercentage: 0.8
              },
            ],
          },
        }}
        height={500}
        width={1000}
      ></Bar>
    </div>
  );
}
