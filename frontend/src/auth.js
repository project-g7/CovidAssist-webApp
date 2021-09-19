import Axios from "axios";
const jwt = require("jsonwebtoken");

class Auth {
  constructor() {
    // this.authenticated = false;
    // this.userAuthenticated();
  }

  isAdmin() {
    const token = localStorage.getItem("token");
    const header = jwt.decode(token, { complete: true });
    // console.log(header.payload.role);
    if (header != null) {
      if (header.payload.role == "admin") {
        return true;
      } else {
        return false;
      }
    }
  }
    isVaccineManager() {
    const token = localStorage.getItem("token");
    const header = jwt.decode(token, { complete: true });
    // console.log(header.payload.role);
    if (header != null) {
      if (header.payload.role == "Vaccine Manager") {
        return true;
      } else {
        return false;
      }
    }
  }
  isContactTracingManager() {
    const token = localStorage.getItem("token");
    const header = jwt.decode(token, { complete: true });
    // console.log(header.payload.role);
    if (header != null) {
      if (header.payload.role == "Contact Tracing Manager") {
        return true;
      } else {
        return false;
      }
    }
  }
}

export default new Auth();
