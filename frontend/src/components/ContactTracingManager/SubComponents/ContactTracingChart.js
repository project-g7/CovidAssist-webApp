import React, { useEffect, useState } from "react";
import ContactTracingCard from "./ContactTracingCard";
import "../../../styles/VaccineMangerCard.css";
import "../../../styles/ContactTracingReport.css";
import { Bar, Pie, Doughnut, Line, Bubble, Radar } from "react-chartjs-2";
import Axios from "axios";
import BarChart from "./ContactTracingBar";

const ContactTracingChart = () => {
  const [pieChartAge1, setPieChartAge1] = useState(0);
  const [pieChartAge2, setPieChartAge2] = useState(0);
  const [pieChartAge3, setPieChartAge3] = useState(0);

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3002/PieChartAge1")
      .then((res) => {
        console.log(res.data[0].piechart1);
        setPieChartAge1(res.data[0].piechart1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/PieChartAge2")
      .then((res) => {
        console.log(res.data[0].piechart2);
        setPieChartAge2(res.data[0].piechart2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/PieChartAge3")
      .then((res) => {
        console.log(res.data[0].piechart3);
        setPieChartAge3(res.data[0].piechart3);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3002/getexposeddistrict")
      .then((res) => {
        console.log(res.data);
        // setData(res.data);
        // setCenters(res.data[0].centerCount);
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({
            activity: res.data[i].activity,
            value: res.data[i].value,
            color: "#2A78E4",
          });
        }
        console.log(arr);
        setData(arr);
        setVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <div className="Title2">
        <div className="HeadLine">
          <h3>Mobile App Users Exposed Details</h3>

          <div className="subtitle">
            <h3>Covid Patients and Close Contacts Details</h3>
          </div>
        </div>
        <div>
          <ContactTracingCard />
        </div>
        <div className="VaccineChart1">
          <div className="barcontact">
            {visible && <BarChart data={data} />}
          </div>

          <div className="PieChart2">
            <div>
              <h4>Exposed Users Count According to Age Group</h4>

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
                      data: [pieChartAge1, pieChartAge2, pieChartAge3], //calculate the presantage value
                      backgroundColor: [
                        "rgba(255, 99, 132)",
                        "rgba(54, 162, 235)",
                        // "rgba(255, 206, 86)",
                        // "rgba(75, 192, 192)",
                        // "rgba(153, 102, 252)",
                        "rgba(255, 159, 64)",
                        // "rgba(205, 199, 24)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        //  "rgba(255, 206, 86, 1)",
                        // "rgba(75, 192, 192, 1)",
                        // "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        // "rgba(205, 199, 24,1)",
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

export default ContactTracingChart;
