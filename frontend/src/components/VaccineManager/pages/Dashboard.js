import React, { useEffect, useState } from "react";
import "../../../styles/AdminDashboard.css";
import DashboardCard1 from "../SubComponenets/Dashboard/DashboardCard1";
import DashboardCard2 from "../SubComponenets/Dashboard/DashboardCard2";
import DashboardCard3 from "../SubComponenets/Dashboard/DashboardCard3";
import DashboardCard4 from "../SubComponenets/Dashboard/DashboardCard4";
// import LineGraph from "../SubComponents/Dashboard/LineGraph";
import BarChart from "../SubComponenets/Dashboard/BarChart";
import PieChart from "../SubComponenets/Dashboard/PieChart";
import axios from "axios";

const Dashboard = () => {

  const [data,setData] = useState([]);
  const [visible,setVisible] = useState(false);
  // var [count,setCount] = useState(0);


  useEffect(() => {

    // getCenterData();
    // fetchData();
    getCenterData();
  }, []);

  const getCenterData = () => {
    axios
      .get("http://localhost:3002/getcenterdistrict")
      .then((res) => {
        console.log(res.data);
        // setData(res.data);
        // setCenters(res.data[0].centerCount);
        let arr = [];
        for(let i=0;i<res.data.length;i++){
          arr.push({
            activity: res.data[i].activity,
            value: res.data[i].value,
            color: "#2A78E4"
          })
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
        <DashboardCard4 />
        <DashboardCard1 />
        <DashboardCard2 />
        <DashboardCard3 />
      </div>
      <div className="container tab-screen">
        {/* <LineGraph /> */}
        {visible && <BarChart data={data}/>}
        {/* <BarChart data={data} /> */}
        <PieChart/>
      </div>
    </div>
    
  );
};

export default Dashboard;