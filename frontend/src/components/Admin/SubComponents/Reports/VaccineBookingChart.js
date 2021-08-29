import React, { useState, useEffect } from "react";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";
import "../../../../styles/VaccineBooking.css";
import VaccineBookingSearchBar from "./VaccineBookingSearchBar";

function VaccineBookingChart() {
  const [selectdistrict, setSelectDistrict] = useState("");
  const [selectcenter, setSelectCenter] = useState("");
  const [bookings, setBookings] = useState(0);

  const handleDistrict = (selectdistrict) => {
    setSelectDistrict(selectdistrict.district);
    console.log(selectdistrict.district);
    console.log("11111111111111111111");
  };

  const handleVaccineCenter = (select) => {
    setSelectCenter(select.name);
    console.log(selectcenter);
    console.log(select.name);
    console.log("22222222222222222");
    fetchData(select.name);
  };
  useEffect(() => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%");
  }, []);

  const fetchData = async (center) => {
    console.log("3333333333");
    console.log(selectdistrict);
    console.log(center);
    // const encodedDistrict = encodeURIComponent(selectdistrict);
    // console.log(encodedDistrict);
    const encodeVaccineCenter = encodeURIComponent(center);
    console.log(encodeVaccineCenter);
    const response = await fetch(
      `http://localhost:3002/VaccineSelecteDistrict?selectcenter=${encodeVaccineCenter}`,
      { method: "GET" }
    );
    console.log("44444444");
    const results = await response.json();
    console.log(results[0].book);
    setBookings(results[0].book);
    // setdate(results);
    console.log("pqr");
    // console.log(dates);
  };

  return (
    <div className="App">
      <div className="mainBody">
        <div className="Title">
          <h3>Reserved Vaccines Amount for Upcoming Dates</h3>
        </div>
        {/* <div className="BarChartTitle">
        <h4>Bar Chart</h4>
      </div> */}

        <div>
          <VaccineBookingSearchBar
            updateDistrict={handleDistrict}
            updateVaccineCenter={handleVaccineCenter}
          />
        </div>
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
              <h2>{bookings}</h2>
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
    </div>
  );
}

export default VaccineBookingChart;
