import "./App.css";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import WelcomeAdmin from "./components/Admin/WelcomeAdmin";
import AdminVaccineManage from "./components/Admin/pages/VaccineManage";
import DisplayCenter from "./components/Admin/pages/DisplayCenter";
import Requests from "./components/Admin/pages/Requests";
import Iot from "./components/Admin/pages/Iot";
import WelcomeVaccine from "./components/VaccineManager/WelcomeVaccine";
import WelcomeContact from "./components/ContactTracingManager/WelcomeContactTracing";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { VaccineBooking } from "./components/Admin/pages/Reports/VaccineBooking";
import VaccinationAreas from "./components/Admin/pages/Reports/VaccinationAreas";
import HealthMeasures from "./components/Admin/pages/Reports/HealthMeasures";
import VaccinatedDetails from "./components/VaccineManager/Reports/VaccinatedDetails";
import ReservedVaccineList from "./components/VaccineManager/pages/ReservedVaccineList";
import DisplayVerifiedAdministrators from "./components/Admin/SubComponents/Requests/DisplayVerifiedAdministrators";
import DisplayUnverifiedAdministrators from "./components/Admin/SubComponents/Requests/DisplayUnverifiedAdministrator";

import Upcomingbookings from "./components/VaccineManager/pages/Upcomingbookings";
import RegisterDetails from "./components/VaccineManager/pages/RegisterDetails";
import UpcomingRegisterDetails from "./components/VaccineManager/pages/UpcomingRegisterDetails";
import CheckBookingDetails from "./components/VaccineManager/pages/CheckBookingDetails";
// import WelcomeVaccine from "./components/Vaccine/WelcomeVaccine";

import DisplayMobileUser from "./components/ContactTracingManager/SubComponents/DisplayMobileUser";
import ViewExposure from "./components/ContactTracingManager/SubComponents/ViewExposure";
import Profile from "./components/Admin/pages/Profile";
import vaccineProfile from "./components/VaccineManager/pages/Profile";
import ctProfile from "./components/ContactTracingManager/pages/Profile";
import Dashboard from "./components/ContactTracingManager/SubComponents/Dashboard";
import ContactTracingReport from "./components/ContactTracingManager/Reports/contacttracingReport";
// import contacttracingReport from "./components/ContactTracingManager/Reports/contacttracingReport";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin.js";
import { ProtectedRouteContact } from "./ProtectedRouteContact.js";
import { ProtectedRouteVaccine } from "./ProtectedRouteVaccine.js";
// import jwt from './jsonwebtoken';
const jwt = require("jsonwebtoken");
function App() {
  // const token = localStorage.getItem("token");
  // const header = jwt.decode(token, { complete: true });
  // // console.log(header.payload.role);
  // if (header != null) {
  //   if (header.payload.role == "admin") {
  //     return (
  //       <Router>
  //         <Switch>
  //           <Route exact path="/admin" component={WelcomeAdmin} />
  //         </Switch>
  //       </Router>
  //     );
  //   }
  // }

  return (
    <Router>
      <Switch>
        <Route exact path="/ForgotPassword" component={ForgotPassword}></Route>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/Register" component={Register}></Route>
        <Route exact path="/Welcome" component={Welcome}></Route>
        <ProtectedRouteAdmin exact path="/admin" component={WelcomeAdmin} />
        <ProtectedRouteVaccine
          exact
          path="/vaccine"
          component={WelcomeVaccine}
        />
        <ProtectedRouteAdmin
          exact
          path="/admin/vaccinemanage"
          component={AdminVaccineManage}
        ></ProtectedRouteAdmin>
        <ProtectedRouteAdmin
          exact
          path="/admin/requests"
          component={Requests}
        ></ProtectedRouteAdmin>
        <ProtectedRouteAdmin
          exact
          path="/admin/iot"
          component={Iot}
        ></ProtectedRouteAdmin>
        <ProtectedRouteAdmin
          exact
          path="/admin/reports/vaccinebooking"
          component={VaccineBooking}
        ></ProtectedRouteAdmin>
        <ProtectedRouteAdmin
          exact
          path="/admin/reports/vaccinationAreas"
          component={VaccinationAreas}
        ></ProtectedRouteAdmin>
        <ProtectedRouteAdmin
          exact
          path="/admin/reports/HealthMeasures"
          component={HealthMeasures}
        ></ProtectedRouteAdmin>
        <ProtectedRouteVaccine
          exact
          path="/vaccine/reports/VaccinatedDetails"
          component={VaccinatedDetails}
        ></ProtectedRouteVaccine>
        <ProtectedRouteAdmin
          exact
          path="/admin/vaccinemanage/center"
          component={DisplayCenter}
        ></ProtectedRouteAdmin>
        <ProtectedRouteContact
          exact
          path="/contactTracing"
          component={Dashboard}
        ></ProtectedRouteContact>
        <ProtectedRouteContact
          exact
          path="/contactTracing/mobileUser"
          component={DisplayMobileUser}
        ></ProtectedRouteContact>
        <ProtectedRouteContact
          exact
          path="/contactTracing/viewExposure/mobileUser"
          component={DisplayMobileUser}
        ></ProtectedRouteContact>
        <ProtectedRouteContact
          exact
          path="/contactTracing/viewExposure"
          component={ViewExposure}
        ></ProtectedRouteContact>
        <ProtectedRouteVaccine
          exact
          path="/vaccine/vaccinelist"
          component={ReservedVaccineList}
        ></ProtectedRouteVaccine>
        <ProtectedRouteAdmin
          exact
          path="/admin/profile"
          component={Profile}
        ></ProtectedRouteAdmin>
        <ProtectedRouteVaccine
          exact
          path="/vaccine/profile"
          component={vaccineProfile}
        ></ProtectedRouteVaccine>
        <ProtectedRouteContact
          exact
          path="/ct/profile"
          component={ctProfile}
        ></ProtectedRouteContact>
        <ProtectedRouteAdmin
          exact
          path="/admin/requests/verifiedAdministrators"
          component={DisplayVerifiedAdministrators}
        ></ProtectedRouteAdmin>
        <ProtectedRouteAdmin
          exact
          path="/admin/requests/unverifiedAdministrators"
          component={DisplayUnverifiedAdministrators}
        ></ProtectedRouteAdmin>
        <ProtectedRouteVaccine
          exact
          path="/vaccine/upcoming"
          component={Upcomingbookings}
        ></ProtectedRouteVaccine>
        <ProtectedRouteVaccine
          exact
          path="/vaccine/RegisterDetails"
          component={RegisterDetails}
        ></ProtectedRouteVaccine>
        <ProtectedRouteVaccine
          exact
          path="/vaccine/UpcomingRegisterDetails"
          component={UpcomingRegisterDetails}
        ></ProtectedRouteVaccine>
        <ProtectedRouteVaccine
          exact
          path="/vaccine/CheckBookingDetails"
          component={CheckBookingDetails}
        ></ProtectedRouteVaccine>
        <ProtectedRouteContact
          exact
          path="/contactTracing/reports"
          component={ContactTracingReport}
        ></ProtectedRouteContact>
      </Switch>
    </Router>
  );
}

export default App;
