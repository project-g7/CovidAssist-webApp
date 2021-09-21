import React, { useState, useEffect } from "react";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";
import "../../../../styles/VaccineBooking.css";
import VaccineBookingSearchBar from "./VaccineBookingSearchBar";
import { format } from "date-fns";
function VaccineBookingChart() {
  const [selectdistrict, setSelectDistrict] = useState("");
  const [selectcenter, setSelectCenter] = useState("");
  const [bookings, setBookings] = useState(0);
  const [vaccine, setVaccine] = useState([]);
  const [vaccineName, setVaccineName] = useState("");
  const [dose1, setDose1] = useState(0);
  const [dose2, setDose2] = useState(0);
  const [availDose1, setavailDose1] = useState(0);
  const [availDose2, setavailDose2] = useState(0);
  const [availDose3, setavailDose3] = useState(0);
  const [availDose4, setavailDose4] = useState(0);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [date4, setDate4] = useState("");

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
    fetData(select.name);
    feData(select.name);
    bookedData(select.name);
    bookData(select.name);
    bookDataDetail(select.name);
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

  const fetData = async (centers) => {
    console.log("5555555555555");
    console.log(centers);
    const encodeVaccineCenter = encodeURIComponent(centers);
    console.log(encodeVaccineCenter);
    const response = await fetch(
      `http://localhost:3002/VaccineTypeSelecteDistrict?selectcenter=${encodeVaccineCenter}`,
      { method: "GET" }
    );
    console.log("99999999999999999999");
    const result = await response.json();
    console.log(result.value);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log(result.length);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    if (typeof result.value == "undefined") {
      setVaccine(result);
      setVaccineName(result[0].vaccine_name);
      if (result.length == 1) {
        if (result[0].dose == 1) {
          setDose1(result[0].count);
          setDate2(0);
          console.log(result[0].count);
        } else if (result[0].dose == 2) {
          setDose2(result[0].count);
          setDate1(0);
          console.log(result[0].count);
        }
      }
      if (result.length == 2) {
        if (result[0].dose == 1) {
          setDose1(result[0].count);
          console.log(result[0].count);
        }
        if (result[1].dose == 2) {
          setDose2(result[1].count);
          console.log(result[1].count);
        }
      }
      //vaccine name
      // setVaccineName(result[0].vaccine_name);
      // console.log(result[0].vaccine_name);
      // console.log(result[0].dose);
      // // console.log(result[1].dose);
      // if (result[0].dose == 1) {
      //   //1st dose count
      //   setDose1(result[0].count);
      //   console.log(result[0].count);
      // } else if (result[0].dose == 2) {
      //   //2nd dose count
      //   setDose2(result[0].count);
      //   console.log(result[0].count);
      // } else if (result[1].dose == 2) {
      //   //2nd dose count
      //   setDose2(result[1].count);
      //   console.log(result[1].count);
      // } else if (!result[1].dose) {
      //   dose2 = 0;
      // }
      console.log("***************************");
    } else if (result.value == "NoBookingAvailable") {
      setDate1(0);
      setDate2(0);
    }
  };
  const feData = async (booked) => {
    console.log(booked);
    const encodeBookedDetails = encodeURIComponent(booked);
    console.log(encodeBookedDetails);
    const response = await fetch(
      `http://localhost:3002/VaccineBookedDetails?selectcenter=${encodeBookedDetails}`,
      { method: "GET" }
    );
    console.log("--------------------");
    const resultDetails = await response.json();
    console.log(resultDetails);

    if (typeof resultDetails.value == "undefined") {
      setavailDose1(resultDetails[0].booked);
      console.log(resultDetails[0].booked);
      console.log(availDose1);

      var date = format(new Date(), "yyyy-MM-dd");
      console.log(date);
      setDate1(date);
      // console.log(resultDetails[0].date.substring(0, 10));
      // setDate1(resultDetails[0].date.substring(0, 10));
    } else if (resultDetails.value == "BookingDetailsError") {
      setavailDose1(0);
    }
  };

  const bookedData = async (booked2) => {
    console.log(booked2);
    const encodeBookedDetails2 = encodeURIComponent(booked2);
    console.log(encodeBookedDetails2);
    const response = await fetch(
      `http://localhost:3002/VaccineBookedDetails2?selectcenter=${encodeBookedDetails2}`,
      { method: "GET" }
    );
    console.log("--------------------");
    const resultDetails2 = await response.json();
    console.log(resultDetails2);

    if (typeof resultDetails2.value == "undefined") {
      setavailDose2(resultDetails2[0].booked);
      console.log(resultDetails2[0].booked);

      let date = format(new Date(), "yyyy-MM-dd");
      let dateone = new Date(date);
      dateone.setDate(dateone.getDate() + 1);
      let newDate1 = dateone.toISOString().substring(0, 10);
      console.log(newDate1);
      setDate2(newDate1);
      // console.log(resultDetails2[0].date.substring(0, 10));
      // setDate2(resultDetails2[0].date.substring(0, 10));
    } else if (resultDetails2.value == "BookingDetails2Error") {
      setDate2(0);
    }
  };

  const bookData = async (booked3) => {
    console.log(booked3);
    const encodeBookedDetails3 = encodeURIComponent(booked3);
    console.log(encodeBookedDetails3);
    const response = await fetch(
      `http://localhost:3002/VaccineBookedDetails3?selectcenter=${encodeBookedDetails3}`,
      { method: "GET" }
    );
    console.log("--------------------");
    const resultDetails3 = await response.json();
    console.log(resultDetails3);

    if (typeof resultDetails3.value == "undefined") {
      setavailDose3(resultDetails3[0].booked);
      console.log(resultDetails3[0].booked);

      let date = format(new Date(), "yyyy-MM-dd");
      let datetwo = new Date(date);
      datetwo.setDate(datetwo.getDate() + 2);
      let newDate2 = datetwo.toISOString().substring(0, 10);
      console.log(newDate2);
      setDate3(newDate2);

      // console.log(resultDetails3[0].date.substring(0, 10));
      // setDate3(resultDetails3[0].date.substring(0, 10));
    } else if (resultDetails3.value == "BookingDetails3Error") {
      setDate3(0);
    }
  };

  const bookDataDetail = async (booked4) => {
    console.log(booked4);
    const encodeBookedDetails4 = encodeURIComponent(booked4);
    console.log(encodeBookedDetails4);
    const response = await fetch(
      `http://localhost:3002/VaccineBookedDetails4?selectcenter=${encodeBookedDetails4}`,
      { method: "GET" }
    );
    console.log("--------------------");
    const resultDetails4 = await response.json();
    console.log(resultDetails4);

    if (typeof resultDetails4.value == "undefined") {
      setavailDose4(resultDetails4[0].booked);
      console.log(resultDetails4[0].booked);

      let date = format(new Date(), "yyyy-MM-dd");
      let datethree = new Date(date);
      datethree.setDate(datethree.getDate() + 3);
      let newDate3 = datethree.toISOString().substring(0, 10);
      console.log(newDate3);
      setDate4(newDate3);
      console.log(date1);
      console.log('nuwa');
      // console.log(resultDetails4[0].date.substring(0, 10));
      // setDate4(resultDetails4[0].date.substring(0, 10));
    } else if (resultDetails4.value == "BookingDetails4Error") {
      setDate4(0);
    }
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
        <div className='header1'>
      <h4 className='title'>Available and Booked Vaccines Count</h4>  </div>
        <div className="MainChart">
      
          <Bar 
            // width={"50px"}
            // height={"50px"}
            data={{
              labels: [date1, date2, date3, date4],
              datasets: [
                {
                  label: "Booked",
                  data: [availDose1, availDose2, availDose3, availDose4],
                  backgroundColor: "rgba(54, 162, 235)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  barThickness: 60,
                },
                {
                  label: "Available",
                  data: [
                    200 - availDose1,
                    200 - availDose2,
                    200 - availDose3,
                    200 - availDose4,
                  ],
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
              <h5>Total Numbers of Upcoming Bookings </h5>
              <h2 className="fontcolr">{bookings}</h2>
            </div>
          </div>
          <div className="BookCard3">
            <div className="BookCardBoady1">
              <h5>Today's Bookig Details</h5>
              <h5 className="fontcolr">{vaccineName} </h5>
              <h5>1st Dose : {dose1}</h5>
              <h5>2nd Dose :{dose2}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaccineBookingChart;
