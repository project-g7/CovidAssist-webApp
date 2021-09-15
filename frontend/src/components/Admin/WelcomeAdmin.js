import React from "react";
import Sidebar from "./AdminSidebar";
import Dashboard from "./pages/Dashboard.js";
// import WelcomeAdmin from "./components/Admin/WelcomeAdmin";
import AdminVaccineManage from "./pages/VaccineManage";
import Requests from "./pages/Requests";
import Iot from "./pages/Iot";
import App from '../../App'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";


const WelcomeAdmin = () => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
        <Dashboard/>
        {/* <Switch component={App}>
        <Route exact path="/admin" component={Dashboard}></Route>
        <Route exact path="/admin/vaccinemanage" component={AdminVaccineManage}></Route>
        <Route exact path="/admin/requests" component={Requests}></Route>
        <Route exact path="/admin/iot" component={Iot}></Route>
        </Switch> */}
          
      {/* </div> */}
    </div>
  );
};

export default WelcomeAdmin;
