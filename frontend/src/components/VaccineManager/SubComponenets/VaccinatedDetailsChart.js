import React, { useState, useEffect } from "react";
import "../../../styles/VaccineManagerChart.css";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";
import VaccinatedCalender from "./VaccinatedCalender";
import axios from "axios";
import { format } from "date-fns";
import "../../../styles/VaccineMangerCard.css";
import {url} from "../../config"

const VaccinatedDetailsChart = () => {
  const [firstDoseCount1, setFirstDoseCount1] = useState(0);
  const [firstDoseCount2, setFirstDoseCount2] = useState(0);
  const [firstDoseCount3, setFirstDoseCount3] = useState(0);
  const [firstDoseCount4, setFirstDoseCount4] = useState(0);
  const [secondDoseCount1, setSecondDoseCount1] = useState(0);
  const [secondDoseCount2, setSecondDoseCount2] = useState(0);
  const [secondDoseCount3, setSecondDoseCount3] = useState(0);
  const [secondDoseCount4, setSecondDoseCount4] = useState(0);

  const [vaccineCenter, setVaccineCenter] = useState("");
  const [vaccinDistrict, setVaccineDistrict] = useState("");
  const [vaccineName, setVaccineName] = useState("");

  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [date4, setDate4] = useState("");

  const [pieChart1, setPieChart1] = useState(0);
  const [pieChart2, setPieChart2] = useState(0);
  const [pieChart3, setPieChart3] = useState(0);
  const [people, setPeople] = useState("");

  useEffect(() => {
    getFirstDoseCount1();
    getFirstDoseCount2();
    getFirstDoseCount3();
    getFirstDoseCount4();
    getSecondDoseCount1();
    getSecondDoseCount2();
    getSecondDoseCount3();
    getSecondDoseCount4();
    getVaccineCenterDistrict();
    getVaccineName();
    getVaccinatedPieChart1();
    getVaccinatedPieChart2();
    getVaccinatedPieChart3();
    getVaccinatedPeople();
  }, []);

  const getFirstDoseCount1 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/firstDoseCount1", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setFirstDoseCount1(res.data[0].firstDose1);
        var date = format(new Date(), "yyyy-MM-dd");
        console.log(date);
        setDate1(date);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFirstDoseCount2 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/firstDoseCount2", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setFirstDoseCount2(res.data[0].firstDose2);
        let date = format(new Date(), "yyyy-MM-dd");
        let dateone = new Date(date);
        dateone.setDate(dateone.getDate() - 1);
        let newDate1 = dateone.toISOString().substring(0, 10);
        console.log(newDate1);
        setDate2(newDate1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFirstDoseCount3 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/firstDoseCount3", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setFirstDoseCount3(res.data[0].firstDose3);
        let date = format(new Date(), "yyyy-MM-dd");
        let datetwo = new Date(date);
        datetwo.setDate(datetwo.getDate() - 2);
        let newDate2 = datetwo.toISOString().substring(0, 10);
        console.log(newDate2);
        setDate3(newDate2);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFirstDoseCount4 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/firstDoseCount4", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setFirstDoseCount4(res.data[0].firstDose4);
        let date = format(new Date(), "yyyy-MM-dd");
        let datethree = new Date(date);
        datethree.setDate(datethree.getDate() - 3);
        let newDate3 = datethree.toISOString().substring(0, 10);
        console.log(newDate3);
        setDate4(newDate3);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSecondDoseCount1 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/secondDoseCount1", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setSecondDoseCount1(res.data[0].secondDose1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSecondDoseCount2 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/secondDoseCount2", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setSecondDoseCount2(res.data[0].secondDose2);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSecondDoseCount3 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/secondDoseCount3", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setSecondDoseCount3(res.data[0].secondDose3);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSecondDoseCount4 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/secondDoseCount4", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setSecondDoseCount4(res.data[0].secondDose4);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVaccineCenterDistrict = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/vaccineCenterDistrict", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setVaccineDistrict(res.data[0].district);
        setVaccineCenter(res.data[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVaccineName = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/vaccineName", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setVaccineName(res.data[0].vaccine_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVaccinatedPieChart1 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/vaccinatedPieChart1", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setPieChart1(res.data[0].AgeCount1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVaccinatedPieChart2 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/vaccinatedPieChart2", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setPieChart2(res.data[0].AgeCount2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVaccinatedPieChart3 = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/vaccinatedPieChart3", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setPieChart3(res.data[0].AgeCount3);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVaccinatedPeople = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);

    axios
      .get("http://localhost:3002/vaccinatedPeople", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        setPeople(res.data[0].AgeCountPeople);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <div className="Title1">
        <div className="HeadLine">
          <h3>Vaccinated Details in the Center </h3>

          <div className="subtitle">
            <h3>Vaccinated Details in Center</h3>
          </div>
        </div>
        <div>
          <VaccinatedCalender />
        </div>
        <div
          class="rows1"
          name="viewport"
          content="width=device-width, initial-scale=1"
        >
          <div class="columns2">
            <div class="cards2">
              <h5 class="fonts">District</h5>

              <h5>{vaccinDistrict}</h5>
            </div>
          </div>

          <div class="columns3">
            <div class="cards3">
              <h5 class="fonts">Center Name</h5>

              <h5>{vaccineCenter}</h5>
            </div>
          </div>

          <div class="columns4">
            <div class="cards4">
              <h5 class="fonts">Vaccine Name</h5>

              <h5>{vaccineName}</h5>
            </div>
          </div>
        </div>
        <div className="header1">
          <h4 className="title">Vaccinated Count in Last Four Days</h4>{" "}
        </div>
        <div className="VaccineChart">
          {/* <div>
          <h3>Pie Chart</h3>
        </div> */}

          <Bar
            data={{
              labels: [date1, date2, date3, date4],
              datasets: [
                {
                  label: "# 1st Dose",
                  data: [
                    firstDoseCount1,
                    firstDoseCount2,
                    firstDoseCount3,
                    firstDoseCount4,
                  ],
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
                // {
                //   label: "# 2n Dose",
                //   data: [secondDoseCount1, secondDoseCount2, secondDoseCount3],
                //   backgroundColor: [
                //     // "rgba(255, 99, 132)",
                //     // "rgba(54, 162, 235)",
                //     "rgba(75, 192, 192)",
                //     "rgba(255, 159, 64)",
                //     //"rgba(255, 206, 86)",
                //     "rgba(153, 102, 252)",
                //     // "rgba(255, 159, 64)",
                //     // "rgba(205, 199, 24)",
                //   ],
                //   borderColor: [
                //     // "rgba(255, 99, 132, 1)",
                //     // "rgba(54, 162, 235, 1)",
                //     "rgba(75, 192, 192, 1)",
                //     "rgba(255, 159, 64, 1)",
                //     // "rgba(255, 206, 86, 1)",

                //     "rgba(153, 102, 255, 1)",
                //     // "rgba(255, 159, 64, 1)",
                //     // "rgba(205, 199, 24,1)",
                //   ],
                //   barThickness: 60,
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
          <div className="PieChart1">
            <div>
              <h4>Vaccinated Age Group</h4>

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
