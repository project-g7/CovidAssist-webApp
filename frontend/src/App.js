import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import WelcomeAdmin from "./components/Admin/WelcomeAdmin";
import AdminVaccineManage from "./components/Admin/pages/VaccineManage";
import DisplayCenter from "./components/Admin/pages/DisplayCenter";
import Requests from "./components/Admin/pages/Requests";
import Profile from "./components/Admin/pages/Profile";
import vaccineProfile from "./components/VaccineManager/pages/Profile";
import ctProfile from "./components/ContactTracingManager/pages/Profile";
import Iot from "./components/Admin/pages/Iot";
import WelcomeVaccine from "./components/VaccineManager/WelcomeVaccine";
import WelcomeContact from "./components/ContactTracingManager/WelcomeContactTracing";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import { BrowserRouter as Router, Link, Route, Switch,Redirect } from "react-router-dom";
import { VaccineBooking } from "./components/Admin/pages/Reports/VaccineBooking";
import VaccinationAreas from "./components/Admin/pages/Reports/VaccinationAreas";
import HealthMeasures from "./components/Admin/pages/Reports/HealthMeasures";
import VaccinatedDetails from "./components/VaccineManager/Reports/VaccinatedDetails";
import ReservedVaccineList from "./components/VaccineManager/pages/ReservedVaccineList";
import DisplayVerifiedAdministrators from "./components/Admin/SubComponents/Requests/DisplayVerifiedAdministrators"
import DisplayUnverifiedAdministrators from "./components/Admin/SubComponents/Requests/DisplayUnverifiedAdministrator"

import Upcomingbookings from "./components/VaccineManager/pages/Upcomingbookings"; 
import RegisterDetails from "./components/VaccineManager/pages/RegisterDetails";
import UpcomingRegisterDetails from "./components/VaccineManager/pages/UpcomingRegisterDetails";
import CheckBookingDetails from "./components/VaccineManager/pages/CheckBookingDetails";
// import WelcomeVaccine from "./components/Vaccine/WelcomeVaccine";

function App() {
  const [loggedIn,setLoggedIn] = useState(true);
  return (
    <Router>
      <Switch>
        <Route exact path="/ForgotPassword" component={ForgotPassword}></Route>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/Register" component={Register}></Route>
        <Route exact path="/Welcome" component={Welcome}></Route>
        <Route exact path="/admin" component={WelcomeAdmin}></Route>
        <Route exact path="/vaccine" component={WelcomeVaccine}></Route>
        <Route exact path="/ct" component={WelcomeContact}></Route>
        <Route
          exact
          path="/admin/vaccinemanage"
          component={AdminVaccineManage}
        ></Route>
        <Route exact path="/admin/requests" component={Requests}></Route>
        <Route exact path="/admin/iot" component={Iot}></Route>
        <Route
          exact
          path="/admin/reports/vaccinebooking"
          component={VaccineBooking}
        ></Route>
        <Route
          exact
          path="/admin/reports/vaccinationAreas"
          component={VaccinationAreas}
        ></Route>
        <Route
          exact
          path="/admin/reports/HealthMeasures"
          component={HealthMeasures}
        ></Route>
        <Route
          exact
          path="/vaccine/reports/VaccinatedDetails"
          component={VaccinatedDetails}
        ></Route>
        <Route
          exact
          path="/admin/vaccinemanage/center"
          component={DisplayCenter}
        ></Route>
         <Route
          exact
          path="/vaccine/vaccinelist"
          component={ReservedVaccineList}
        ></Route>
        <Route
          exact
          path="/admin/profile"
          component={Profile}
        ></Route>
        <Route
          exact
          path="/vaccine/profile"
          component={vaccineProfile}
        ></Route>
        <Route
          exact
          path="/ct/profile"   
          component={ctProfile}
        ></Route>
        <Route 
          exact
          path='/admin/requests/verifiedAdministrators'
          component={DisplayVerifiedAdministrators}
        ></Route>
        <Route 
          exact
          path='/admin/requests/unverifiedAdministrators'
          component={DisplayUnverifiedAdministrators}
        ></Route>
        <Route
          exact
          path="/vaccine/upcoming"   
          component={Upcomingbookings}
        ></Route>
          <Route
          exact
          path="/vaccine/RegisterDetails"   
          component={RegisterDetails}
        ></Route>
        <Route
          exact
          path="/vaccine/UpcomingRegisterDetails"   
          component={UpcomingRegisterDetails}
        ></Route>
          <Route
          exact
          path="/vaccine/CheckBookingDetails"   
          component={CheckBookingDetails}
        ></Route>
        
      </Switch>
    </Router>
  );
}

export default App;
