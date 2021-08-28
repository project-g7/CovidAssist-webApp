const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const crypto = require("crypto");

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
  const startDate = new Date(req.body.startDate.substring(0, 10));
  const endDate = new Date(req.body.endDate.substring(0, 10));
  let n = (endDate - startDate) / (1000 * 60 * 60 * 24);
  let i = 0;

  db.query(
    "SELECT vaccine_id FROM vaccine WHERE vaccine_name = ?",
    [vaccine],
    (errVid, resultVid) => {
      if (errVid) {
        console.log(errVid);
      } else {
        console.log(resultVid[0].vaccine_id);
        let vaccineId = resultVid[0].vaccine_id;
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
                "SELECT center_id FROM vaccine_center WHERE name = ? ",
                [place],
                (errCid, resCid) => {
                  if (errCid) {
                    console.log(errCid);
                  } else {
                    console.log(resCid);
                    console.log(resCid[0].center_id);
                    let centerId = resCid[0].center_id;

                    db.query(
                      "UPDATE covidAssist.vaccine SET dose_1_quantity = dose_1_quantity - ?,dose_2_quantity = dose_2_quantity - ?,dose_3_quantity = dose_3_quantity - ? WHERE vaccine_name = ? ",
                      [dose1, dose2, dose3, vaccine],
                      (errUpdate, resultUpdate) => {
                        if (errUpdate) {
                          console.log("Error in update");
                          console.log(errUpdate);
                        } else {
                          db.query(
                            "INSERT INTO covidAssist.vaccine_center_vaccine(vaccine_id,vaccine_center_id,dose_1_quantity,dose_2_quantity,dose_3_quantity) VALUES(?,?,?,?,?)",
                            [vaccineId, centerId, dose1, dose2, dose3],
                            (errVaccine, resVaccine) => {
                              if (errVaccine) {
                                console.log(errVaccine);
                              } else {
                                startDate.setDate(startDate.getDate() - 1); //number  of days to add, e.x. 15 days
                                while (i <= n) {
                                  startDate.setDate(startDate.getDate() + 1); //number  of days to add, e.x. 15 days
                                  var dateFormated = startDate
                                    .toISOString()
                                    .substr(0, 10);
                                  // console.log(dateFormated);
                                  db.query(
                                    "INSERT INTO available_time(center_id,date,`8.00-10.00`,`10.00-12.00`,`1.00-3.00`,`3.00-5.00`) VALUES(?,?,?,?,?,?)",
                                    [centerId, dateFormated, 0, 0, 0, 0],
                                    (errAvailable, resAvailable) => {
                                      if (errAvailable) {
                                        console.log(errAvailable);
                                      } else {
                                        console.log("updated");
                                      }
                                    }
                                  );
                                  i = i + 1;
                                }
                                res.send("Success");
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );

              // console.log(result);
            }
          }
        );
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

app.post("/updateVaccine", (req, res) => {
  const id = req.body.vaccine_id;
  const dose1 = req.body.dose_1_quantity;
  const dose2 = req.body.dose_2_quantity;
  const dose3 = req.body.dose_3_quantity;
  db.query(
    "UPDATE covidAssist.vaccine SET dose_1_quantity = ?,dose_2_quantity = ?,dose_3_quantity = ? WHERE vaccine_id = ?",
    [dose1, dose2, dose3, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
        console.log("Success");
      }
    }
  );
});

app.post("/addVaccine", (req, res) => {
  const vaccine = req.body.vaccine;
  const dose1 = Number(req.body.dose1Amount);
  const dose2 = Number(req.body.dose2Amount);
  const dose3 = Number(req.body.dose3Amount);

  db.query(
    "INSERT INTO covidAssist.vaccine(vaccine_name,dose_1_quantity,dose_2_quantity,dose_3_quantity) VALUES(?,?,?,?) ",
    [vaccine, dose1, dose2, dose3],
    (err, result) => {
      if (err) {
        console.log("Error add vaccine");
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

app.get("/vaccineCenterDetails", (req, res) => {
  const id = req.query.id;
  console.log(id);
  db.query(
    "Select * from vaccine_center WHERE center_id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});
app.get("/vaccineCenterVaccineDetails", (req, res) => {
  const id = req.query.id;
  console.log(id);
  db.query(
    "Select * from vaccine_center_vaccine WHERE vaccine_center_id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});
app.listen(3002, () => {
  console.log("your server is running port 3002");
});
