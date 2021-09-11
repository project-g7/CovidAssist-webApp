import React,{useState,useEffect} from "react";
import { Doughnut } from "react-chartjs-2";
import Axios from "axios";

const PieChart = () => {
     const [dose1, setDose1] = useState("");
  const [dose2, setDose2] = useState("");
  const [dose1dose2, setDose1Dose2] = useState("");
const [users, setUsers] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3002/vaccineFirstDose")
      .then((res) => {
        console.log(res.data[0].countF);
        setDose1(res.data[0].countF);
      })
      .catch((error) => {
        console.log(error);
      });

      Axios.get("http://localhost:3002/vaccineFirstSecondDose")
      .then((res) => {
        console.log(res.data[0].countFS);
        setDose1Dose2(res.data[0].countFS);
      })
      .catch((error) => {
        console.log(error);
      });

      Axios
      .get("http://localhost:3002/getuserscount")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data[0].userCount)

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    labels: ["1st Dose vaccinated", "2nd Dose Vaccinated", "Not Vaccinated"],
    datasets: [
      {
        label: "# of Votes",
        data: [dose1, dose1dose2, users-(dose1 + dose1dose2)],
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div className="pie-chart-body">
        <div className="heading-piechart">
          <h3>Total Mobile Users</h3>
        </div>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default PieChart;
