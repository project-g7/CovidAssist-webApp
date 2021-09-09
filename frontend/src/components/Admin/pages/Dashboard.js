import React, { useEffect, useState } from "react";
import "../../../styles/AdminDashboard.css";
import DashboardCard1 from "../SubComponents/Dashboard/DashboardCard1";
import DashboardCard2 from "../SubComponents/Dashboard/DashboardCard2";
import DashboardCard3 from "../SubComponents/Dashboard/DashboardCard3";
import DashboardCard4 from "../SubComponents/Dashboard/DashboardCard4";
import LineGraph from "../SubComponents/Dashboard/LineGraph";
import BarChart from "../SubComponents/Dashboard/BarChart";
import PieChart from "../SubComponents/Dashboard/PieChart";
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

const data2 = [
  { activity: "data[0].activity", value: 90, color: "#2A78E4" },
  { activity: "Character and Plot", value: 80, color: "#2A78E4" },
  { activity: "Elements of Poetry", value: 70, color: "#2A78E4" },
  { activity: "Standard 8.10", value: 60, color: "#2A78E4" },
  { activity: "8.1.3", value: 50, color: "#2A78E4" },
  { activity: "Skill 6", value: 40, color: "#2A78E4" },
  { activity: "Skill 7", value: 30, color: "#2A78E4" },
  { activity: "Skill 8", value: 21, color: "#2A78E4" },
  { activity: "Skill 9", value: 10, color: "#2A78E4" },
  { activity: "Skill 10", value: 5, color: "#2A78E4" },
  { activity: "8.1.34", value: 50, color: "#2A78E4" },
  { activity: "Skill 60", value: 40, color: "#2A78E4" },
  { activity: "Skill 70", value: 30, color: "#2A78E4" },
  { activity: "Skill 80", value: 21, color: "#2A78E4" },
  { activity: "Skill 90", value: 10, color: "#2A78E4" },
  { activity: "Skill 100", value: 5, color: "#2A78E4" },
  { activity: "Skill 900", value: 100, color: "#2A78E4" },
  { activity: "Skill 1000", value: 50, color: "#2A78E4" },
  { activity: "Skill -1", value: 5, color: "#2A78E4" },
  { activity: "8.1.35", value: 50, color: "#2A78E4" },
  { activity: "Skill 160", value: 40, color: "#2A78E4" },
  { activity: "Skill 10-2", value: 30, color: "#2A78E4" },
  { activity: "Skill 20", value: 21, color: "#2A78E4" },
  { activity: "Skill 80-2", value: 10, color: "#2A78E4" },
  { activity: "Skill 650", value: 5, color: "#2A78E4" },
  { activity: "Skill 300", value: 100, color: "#2A78E4" },
  { activity: "Skill 3000", value: 50, color: "#2A78E4" }
];

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
