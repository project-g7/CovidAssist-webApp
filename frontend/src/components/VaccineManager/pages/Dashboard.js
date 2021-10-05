import React, { useEffect, useState } from "react";
import "../../../styles/AdminDashboard.css";
import DashboardCard1 from "../SubComponenets/Dashboard/DashboardCard1";
import DashboardCard2 from "../SubComponenets/Dashboard/DashboardCard2";
import DashboardCard3 from "../SubComponenets/Dashboard/DashboardCard3";
import DashboardCard4 from "../SubComponenets/Dashboard/DashboardCard4";
import LineGraph from "../SubComponenets/Dashboard/LineGraph";
import BarChart from "../SubComponenets/Dashboard/BarChart";
import PieChart from "../SubComponenets/Dashboard/PieChart";
import PieChart2 from "../SubComponenets/Dashboard/PieChart2";
import axios from "axios";
import {url} from "../../config"

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  // var [count,setCount] = useState(0);

  useEffect(() => {
    // getCenterData();
    // fetchData();
    getCenterData();
  }, []);

  const getCenterData = () => {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);
    console.log(data.user_name);
    axios
      .get("http://localhost:3002/getupcomingbookingsdate", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        // setData(res.data);
        // setCenters(res.data[0].centerCount);
        let arr = [];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({
            // activity: res.data[i].activity.substr(0,10),
            activity: new Date(
              new Date(res.data[i].activity.substring(0, 10)).setDate(
                new Date(res.data[i].activity.substring(0, 10)).getDate() + 1
              )
            )
              .toISOString()
              .substring(0, 10),
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
  };

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3002/getcenterdistrict`, {
      method: "GET",
    });
    const results = await response.json();
    console.log(results);
    setData(results);
  };

  return (
    <div className="container">
      <div className="row d-body">
        <DashboardCard1 />
        <DashboardCard2 />
        <DashboardCard3 />
        <DashboardCard4 />
      </div>
      <div className="container tab-screen">
        {/* <LineGraph /> */}
        {visible && <BarChart data={data} />}
        {/* <BarChart data={data} /> */}
        {/* <PieChart/> */}
        <PieChart />
      </div>
    </div>
  );
};

export default Dashboard;
