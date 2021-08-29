const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const crypto = require("crypto");
const { request } = require("http");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "database-1.ctdegncxgy0s.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  database: "covidAssist",
});

app.post("/create", (req, res) => {
  const first_name = req.body.FirstName;
  const last_name = req.body.LastName;
  const nic = req.body.NIC;
  const email = req.body.Email;
  const address = req.body.Address;
  const dob = req.body.Date;
  const gender = req.body.Gender;
  const contact_number = req.body.ContactNumber;
  const password = req.body.Password;
  const status = 1;
  const user_role = req.body.UserRole;
  const user_name = req.body.UserName;
  const hash = crypto.createHash("md5").update(password).digest("hex");

  db.query(
    "SELECT * FROM web_user WHERE user_name = ? AND status = 1",
    [user_name],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send({ message: "This username has already taken" });
      } else {
        db.query(
          "SELECT * FROM web_user WHERE email = ? AND status = 1",
          [email],
          (err, result) => {
            if (err) {
              res.send({ err: err });
            }
            if (result.length > 0) {
              res.send({ message: "This email has already taken" });
            } else {
              db.query(
                "INSERT INTO web_user (first_name,last_name,nic,email,address,dob,gender,contact_number,user_name,password,status,user_role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                [
                  first_name,
                  last_name,
                  nic,
                  email,
                  address,
                  dob,
                  gender,
                  contact_number,
                  user_name,
                  hash,
                  status,
                  user_role,
                ],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send({ message: "Success" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.post("/login", (req, res) => {
  const user_name = req.body.UserName;
  const password = req.body.Password;
  const hashpass = crypto.createHash("md5").update(password).digest("hex");

  db.query(
    "SELECT * FROM web_user WHERE user_name = ? AND password = ? AND status = 1",
    [user_name, hashpass],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
        console.log(result);
        console.log(user_name + " " + password);
      } else {
        res.send({ message: "Wrong username / password combination" });
        console.log("Wrong username and password combination");
      }
    }
  );
});

// approve request

app.get("/verifiedAdministrators", (req, res) => {
  db.query(
    "SELECT user_id, user_name, user_role FROM covidAssist.web_user WHERE status=1",
    (err, result) => {
      if (err) {
        console.log("Error ---1");
        res.send(err);
      } else {
        res.send(result);
        console.log("Success");
        // console.log(result);
      }
    }
  );
});

app.get("/unverifiedAdministrators", (req, res) => {
  db.query(
    "SELECT user_id, user_name, user_role FROM covidAssist.web_user WHERE status=0",
    (err, result) => {
      if (err) {
        console.log("Error ---1");
        res.send(err);
      } else {
        res.send(result);
        console.log("Success");
        // console.log(result);
      }
    }
  );
});

app.get("/vaccines", (req, res) => {
  db.query("SELECT * FROM covidAssist.vaccine", (err, result) => {
    if (err) {
      console.log("Error vaccine");
      res.send(err);
    } else {
      res.send(result);
      console.log("Success");
      // console.log(result);
    }
  });
});

app.get("/vaccineCenters", (req, res) => {
  db.query("SELECT * FROM covidAssist.vaccine_center", (err, result) => {
    if (err) {
      console.log("Error center");
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
      console.log("Success");
      // console.log(result);
    }
  });
});

app.post("/addVaccineCenter", (req, res) => {
  const district = req.body.district;
  const place = req.body.place;
  const vaccine = req.body.vaccine;
  const dose1 = Number(req.body.dose1Amount);
  const dose2 = Number(req.body.dose2Amount);
  const dose3 = Number(req.body.dose3Amount);
  const latitude = req.body.lat;
  const longitude = req.body.lng;
  const startDate = req.body.startDate.substring(0, 10);
  const endDate = req.body.endDate.substring(0, 10);

  db.query(
    "INSERT INTO covidAssist.vaccine_center(admin_id,name,district,start_date,end_date,longitude,latitude) VALUES(?,?,?,?,?,?,?) ",
    [1, place, district, startDate, endDate, longitude, latitude],
    (err, result) => {
      if (err) {
        console.log("Error add center");
        console.log(err);
        res.send(err);
      } else {
        db.query(
          "UPDATE covidAssist.vaccine SET dose_1_quantity = dose_1_quantity - ?,dose_2_quantity = dose_2_quantity - ?,dose_3_quantity = dose_3_quantity - ? WHERE vaccine_name = ? ",
          [dose1, dose2, dose3, vaccine],
          (errUpdate, resultUpdate) => {
            if (errUpdate) {
              console.log("Error in update");
              console.log(errUpdate);
            } else {
              console.log("updated");
              res.send("Success");
            }
          }
        );
        // console.log(result);
      }
    }
  );
});
app.post("/addIoTLocation", (req, res) => {
  const district = req.body.district;
  const place = req.body.place;
  const latitude = req.body.lat;
  const longitude = req.body.lng;
  // console.log(district);
  // console.log(latitude);

  db.query(
    "INSERT INTO covidAssist.iot_device(admin_id,district,place,longitude,latitude) VALUES(?,?,?,?,?) ",
    [1, district, place, longitude, latitude],
    (err, result) => {
      if (err) {
        console.log("Error add iot");
        console.log(err);
        res.send(err);
      } else {
        res.send("Success");
        console.log("Success");
        // console.log(result);
      }
    }
  );
});
// Vaccinated details - ADMIN dashboard card details
app.get("/vaccineFirstDose", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) AS countF FROM covidAssist.booking WHERE status=1 AND dose_1 =1 ",
    (err, result) => {
      if (err) {
        console.log("Error 1st Dose");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("Calculated Successfuly");
        console.log(result);
      }
    }
  );
});
app.get("/vaccineSecondDose", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) AS countS FROM covidAssist.booking WHERE status=1 AND dose_2 =1",
    (err, result) => {
      if (err) {
        console.log("Error 2nd Dose");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("Calculated Successfuly-dose2");
        console.log(result);
      }
    }
  );
});
app.get("/vaccineFirstSecondDose", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) AS countFS FROM covidAssist.booking WHERE status=1 AND (dose_2 =1 AND dose_1 = 1)",
    (err, result) => {
      if (err) {
        console.log("Error 2st Dose");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("Calculated Successfuly-dose2");
        console.log(result);
      }
    }
  );
});
app.get("/vaccineBooking", (req, res) => {
  db.query(
    "SELECT COUNT(booking_id) AS booking FROM covidAssist.booking ",
    (err, result) => {
      if (err) {
        console.log("Error registerd people");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("Calculated Successfuly-registerd people");
        console.log(result);
      }
    }
  );
});
//vaccinated bar chart-Admin dashboard
app.get("/sputnikVfirstDose", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) AS sputnikV1 FROM covidAssist.booking WHERE vaccine_id=1 AND status=1 AND dose_1=1; ",
    (err, result) => {
      if (err) {
        console.log("Error sputnik v dose1");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("sputnik v dose1 successful");
        console.log(result);
      }
    }
  );
});
app.get("/sputnikVsecondDose", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) AS sputnikV2 FROM covidAssist.booking WHERE status=1 AND vaccine_id=1 AND dose_2=1;; ",
    (err, result) => {
      if (err) {
        console.log("Error sputnik v dose2");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("sputnik v dose2 successful");
        console.log(result);
      }
    }
  );
});
app.get("/astraZenecaFirstDose", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) as astra1 FROM covidAssist.booking WHERE status=1 AND vaccine_id=2 AND dose_1=1;; ",
    (err, result) => {
      if (err) {
        console.log("Error AstraZeneca  dose1");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("AstraZeneca  dose1 successful");
        console.log(result);
      }
    }
  );
});
app.get("/astraZenecaSecondDose", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) as astra2 FROM covidAssist.booking WHERE status=1 AND vaccine_id=2 AND dose_2=1 ",
    (err, result) => {
      if (err) {
        console.log("Error AstraZeneca  dose2");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("AstraZeneca  dose2 successful");
        console.log(result);
      }
    }
  );
});
app.get("/sinopharmFirstDose", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) as sinopharm1 FROM covidAssist.booking WHERE status=1 AND vaccine_id=3 AND dose_1=1 ",
    (err, result) => {
      if (err) {
        console.log("Error Sinopharm  dose1");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("Sinopharm  dose1 successful");
        console.log(result);
      }
    }
  );
});
app.get("/sinopharmSecondDose", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) as sinopharm2 FROM covidAssist.booking WHERE status=1 AND vaccine_id=3 AND dose_2=1 ",
    (err, result) => {
      if (err) {
        console.log("Error Sinopharm  dose2");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("Sinopharm  dose2 successful");
        console.log(result);
      }
    }
  );
});

// Booked vaccines- Admin dashboard
app.get("/districtAndVaccinecenter", (req, res) => {
  db.query(
    "SELECT DISTINCT(district),center_id,name FROM covidAssist.vaccine_center",
    (err, result) => {
      if (err) {
        console.log("Error District");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("Distict selected successful");
        console.log(result);
      }
    }
  );
});
app.get("/VaccineSelecteDistrict", (req, res) => {
  //const district = request.query.selectdistrict;
  const center = request.query.selectcenter;
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_center WHERE name=?",
    [center],
    (err, result) => {
      if (err) {
        console.log("Error select center");
        // console.log(err);
        // res.send(err);
      } else {
        console.log(result[0].center_id);
        let centerId = result[0].center_id;
        db.query(
          "SELECT COUNT(mobile_user_id) AS book FROM covidAssist.booking WHERE center_id=?",
          [centerId],
          (errCenter, resultCenter) => {
            if (errCenter) {
              console.log("Error booking!!!!");
            } else {
              res.send(resultCenter);
              console.log(resultCenter);
              console.log("successful center selected!!!!!!!");
            }
          }
        );
      }
    }
  );
});

app.listen(3002, () => {
  console.log("your server is running port 3002");
});
