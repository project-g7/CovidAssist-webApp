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
app.get("/getDistrictVaccinecenter", (req, res) => {
  db.query(
    "SELECT DISTINCT district FROM covidAssist.vaccine_center",
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
  const center = req.query.selectcenter;
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
          "SELECT COUNT(mobile_user_id) AS book FROM covidAssist.booking WHERE center_id=? AND status=0 ",
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
app.get("/VaccineTypeSelecteDistrict", (req, res) => {
  const center = req.query.selectcenter;
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_center WHERE name=?",
    [center],
    (err, result) => {
      if (err) {
        console.log("Error select center");
      } else {
        console.log(result[0].center_id);
        let centerId = result[0].center_id;
        db.query(
          "SELECT count(dose) AS count , vaccine.vaccine_name,dose FROM covidAssist.booking INNER JOIN covidAssist.vaccine ON booking.vaccine_id=vaccine.vaccine_id WHERE center_id=? AND date= CURDATE() AND status=0 group by dose;",
          [centerId],
          (errCenter, resultCenter) => {
            if (errCenter) {
              console.log(" booking!!!!");
            } else {
              if (resultCenter.length <= 0) {
                res.send({ value: "NoBookingAvailable" });
              } else {
                res.send(resultCenter);
                console.log(resultCenter);
                console.log("successful center dose calculated!!!!!!!");
              }
            }
          }
        );
      }
    }
  );
});
app.get("/VaccineBookedDetails", (req, res) => {
  const center = req.query.selectcenter;
  console.log("====================");
  console.log(center);
  console.log("====================");
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_center WHERE name=?",
    [center],
    (errCenter, resultCenter) => {
      if (errCenter) {
        console.log("Error select center");
      } else {
        console.log(resultCenter[0].center_id);
        let centerId = resultCenter[0].center_id;
        db.query(
          "SELECT COUNT(booking_id) AS booked ,date FROM covidAssist.booking WHERE center_id = ? AND status = 0 AND (datediff(date,CURDATE()))=0 ORDER BY date ASC",
          [centerId],
          (errBooked, resultBooked) => {
            if (errBooked) {
              console.log(" wrong Booking Details");
            } else {
              if (resultBooked.length <= 0) {
                res.send({ value: "BookingDetailsError" });
              } else {
                res.send(resultBooked);
                console.log(resultBooked);
                console.log("successful booking details");
              }
            }
          }
        );
      }
    }
  );
});

app.get("/VaccineBookedDetails2", (req, res) => {
  const center = req.query.selectcenter;
  console.log("====================");
  console.log(center);
  console.log("====================");
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_center WHERE name=?",
    [center],
    (errCenter, resultCenter) => {
      if (errCenter) {
        console.log("Error select center");
      } else {
        console.log(resultCenter[0].center_id);
        let centerId = resultCenter[0].center_id;
        db.query(
          "SELECT COUNT(booking_id) AS booked ,date FROM covidAssist.booking WHERE center_id = ? AND status = 0 AND datediff(date,CURDATE())=1 ORDER BY date ASC",
          [centerId],
          (errBooked, resultBooked) => {
            if (errBooked) {
              console.log(" wrong Booking Details2");
            } else {
              if (resultBooked.length <= 0) {
                res.send({ value: "BookingDetails2Error" });
              } else {
                res.send(resultBooked);
                console.log(resultBooked);
                console.log("successful booking2 details");
              }
            }
          }
        );
      }
    }
  );
});

app.get("/VaccineBookedDetails3", (req, res) => {
  const center = req.query.selectcenter;
  console.log("====================");
  console.log(center);
  console.log("====================");
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_center WHERE name=?",
    [center],
    (errCenter, resultCenter) => {
      if (errCenter) {
        console.log("Error select center");
      } else {
        console.log(resultCenter[0].center_id);
        let centerId = resultCenter[0].center_id;
        db.query(
          "SELECT COUNT(booking_id) AS booked ,date FROM covidAssist.booking WHERE center_id = ? AND status = 0 AND (datediff(date,CURDATE())=2) ORDER BY date ASC",
          [centerId],
          (errBooked, resultBooked) => {
            if (errBooked) {
              console.log(" wrong Booking Details3");
            } else {
              if (resultBooked.length <= 0) {
                res.send({ value: "BookingDetails3Error" });
              } else {
                res.send(resultBooked);
                console.log(resultBooked);
                console.log("successful booking3 details");
              }
            }
          }
        );
      }
    }
  );
});

app.get("/VaccineBookedDetails4", (req, res) => {
  const center = req.query.selectcenter;
  console.log("====================");
  console.log(center);
  console.log("====================");
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_center WHERE name=?",
    [center],
    (errCenter, resultCenter) => {
      if (errCenter) {
        console.log("Error select center");
      } else {
        console.log(resultCenter[0].center_id);
        let centerId = resultCenter[0].center_id;
        db.query(
          "SELECT COUNT(booking_id) AS booked ,date FROM covidAssist.booking WHERE center_id = ? AND status = 0 AND (datediff(date,CURDATE())=3) ORDER BY date ASC",
          [centerId],
          (errBooked, resultBooked) => {
            if (errBooked) {
              console.log(" wrong Booking Details4");
            } else {
              if (resultBooked.length <= 0) {
                res.send({ value: "BookingDetails4Error" });
              } else {
                res.send(resultBooked);
                console.log(resultBooked);
                console.log("successful booking4 details");
              }
            }
          }
        );
      }
    }
  );
});

//vaccination areas-Admin dashboard
app.get("/mapMarkerCenters", (req, res) => {
  db.query(
    "SELECT count(booking_id)as total,vaccine_center.center_id,vaccine_center.name,vaccine_center.district,vaccine_center.start_date,vaccine_center.end_date,vaccine_center.longitude,vaccine_center.latitude,vaccine.vaccine_name FROM covidAssist.vaccine_center INNER JOIN covidAssist.vaccine_center_vaccine ON vaccine_center.center_id=vaccine_center_vaccine.vaccine_center_id INNER JOIN covidAssist.vaccine ON vaccine.vaccine_id = vaccine_center_vaccine.vaccine_id INNER JOIN covidAssist.booking ON vaccine_center.center_id=booking.center_id group by name;",
    (error, result) => {
      if (error) {
        console.log("Error select center");
      } else {
        res.send(result);
        console.log(result);
        console.log("-----------------successfully----------------");
      }
    }
  );
});

app.get("/TotalVaccinated", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) AS TotalBooking, booking.center_id, vaccine_center.latitude, vaccine_center.longitude FROM covidAssist.booking INNER JOIN covidAssist.vaccine_center ON booking.center_id=vaccine_center.center_id  WHERE booking.status=1 group by center_id",
    (error, result) => {
      if (error) {
        console.log("Error total Vaccinated");
      } else {
        res.send(result);
        console.log(result);
        console.log("-----------------successfully----------------");
      }
    }
  );
});
app.get("/facemasks", (req, res) => {
  db.query(
    "SELECT facemask.facemask_id,facemask.place_id,facemask.date_time,facemask.facemask_status,iot_device.district,iot_device.place,iot_device.longitude,iot_device.latitude, COUNT(facemask_id) AS facemask FROM covidAssist.facemask INNER JOIN covidAssist.iot_device ON facemask.place_id=iot_device.place_id WHERE facemask.facemask_status=1",
    (error, result) => {
      if (error) {
        console.log("Error facemask");
      } else {
        res.send(result);
        console.log(result);
        console.log("-----------------successfully----------------");
      }
    }
  );
});
app.get("/notfacemasks", (req, res) => {
  db.query(
    "SELECT facemask.facemask_id,facemask.place_id,facemask.date_time,facemask.facemask_status,iot_device.district,iot_device.place,iot_device.longitude,iot_device.latitude, COUNT(facemask_id) AS Notmask FROM covidAssist.facemask INNER JOIN covidAssist.iot_device ON facemask.place_id=iot_device.place_id WHERE facemask.facemask_status=0 ;",
    (error, result) => {
      if (error) {
        console.log("Error Notfacemask");
      } else {
        res.send(result);
        console.log(result);
        console.log("-----------------successfully----------------");
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
        console.log(result[0].vaccine_id);
        const vid = result[0].vaccine_id;
        res.write("vdata", result);

        db.query(
          "SELECT vaccine_name from vaccine WHERE vaccine_id = ?",
          [vid],
          (errVaccine, resultVaccine) => {
            if (errVaccine) {
              console.log(errVaccine);
            } else {
              console.log(resultVaccine);
              res.write("date", resultVaccine);
              res.end();
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
