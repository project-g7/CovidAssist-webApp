import React,{ useState, useEffect }  from "react";
import axios from "axios";

const DashboardCard3 = () => {
  const [requests, setRequests] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3002/getrequestcount")
      .then((res) => {
        console.log(res.data);
        setRequests(res.data[0].requestCount)

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class="card">
      <b>
        <p class="dash">Requests to Approve</p>
      </b>
      <b>
        <p class="infor">{requests}</p>
      </b>
    </div>
  );
};

export default DashboardCard3;
