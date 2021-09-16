const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const crypto = require("crypto");
const { request } = require("http");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "covid-assist-db.cdbjavxo0vob.us-east-2.rds.amazonaws.com",
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
  const status = 0;
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
    "SELECT user_id, concat(first_name, ' ', last_name ) as name , user_role FROM covidAssist.web_user WHERE status=1",
    (err, result) => {
      if (err) {
        console.log("Error inside verifiedAdministrators");
        console.log("Error ---1");
        res.send(err);
      } else {
        res.send(result);
        // console.log("Success");
        // console.log(result);
      }
    }
  );
});

app.get("/unverifiedAdministrators", (req, res) => {
  db.query(
    "SELECT user_id, concat(first_name, ' ', last_name ) as name, user_role FROM covidAssist.web_user WHERE status=0",
    (err, result) => {
      if (err) {
        console.log("Error ---2");
        res.send(err);
      } else {
        res.send(result);
        // console.log("Success");
        console.log(result);
      }
    }
  );
});

app.get("/verifiedAdminDetails", (req, res) => {
  const id = req.query.id;
  db.query(
    "SELECT user_id, user_name, first_name, last_name, address, contact_number, email, user_role FROM covidAssist.web_user  WHERE user_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log("Error ---3");
        res.send(err);
      } else {
        res.send(result);
        // console.log("Success");
        // console.log(result);
      }
    }
  );
});
app.get("/adminVaccineCenter", (req, res) => {
  const id = req.query.id;
  db.query(
    "SELECT vaccine_center.center_id, concat(vaccine_center.name,' ', vaccine_center.district) as assigned_center FROM covidAssist.vaccine_manager, covidAssist.vaccine_center where vaccine_center.center_id = vaccine_manager.center_id and vaccine_manager.user_id = ?;",
    [id],
    (err, result) => {
      if (err) {
        console.log("Error ---4");
        res.send(err);
      } else {
        res.send(result);
        // console.log("Success");
        // console.log(result);
      }
    }
  );
});
app.get("/iotCenters", (req, res) => {
  const id = req.query.id;
  db.query(
    "SELECT place_id,place,district FROM covidAssist.iot_device;",
    (err, result) => {
      if (err) {
        console.log("Error ---4");
        res.send(err);
      } else {
        res.send(result);
        console.log("Success");
        console.log(result);
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
      // console.log("Success");
      // console.log(result);
    }
  });
});
// accept vaccine manager  request
app.post("/assignAdmins", (req, res) => {
  const id = req.body.id;
  const place = req.body.place;
  db.query(
    "update covidAssist.web_user set status = 1 where user_id = ?",
    [id],
    (err, result) => {
      if (err) {
        // console.log("Error in web user update query");
        console.log(err);
        res.send(err);
      } else {
        db.query(
          "insert into covidAssist.vaccine_manager(user_id, center_id) values (?, ?)",
          [id, place],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              db.query(
                "select web_user.email, concat(vaccine_center.name,' ', vaccine_center.district) as center from web_user inner join vaccine_manager on vaccine_manager.user_id = web_user.user_id inner join vaccine_center on vaccine_manager.center_id = vaccine_center.center_id where vaccine_manager.user_id = ?",
                [id],
                (errorEmail, resultEmail) => {
                  if (errorEmail) {
                    console.log(errorEmail);
                  } else {
                    console.log(resultEmail);
                    var email = resultEmail[0].email;
                    var center = resultEmail[0].center;
                    let mailTransporter = nodemailer.createTransport({
                      service: "gmail",
                      auth: {
                        user: "g7titans@gmail.com",
                        pass: "titans@123",
                      },
                    });

                    let mailDetails = {
                      from: '"CovidAssist Admin" <g7titans@gmail.com>',
                      to: email,
                      subject: "Vaccine Manager Verification",
                      text: `Your request for a vaccine manager at CovidAssist has been approved. You have assign to ${center} vaccine center.`,
                    };

                    mailTransporter.sendMail(mailDetails, function (err, data) {
                      if (err) {
                        console.log("Error Occurs");
                        console.log(err);
                      } else {
                        console.log("Email sent successfully");
                      }
                    });
                  }
                }
              );

              // console.log("updated");
            }
          }
        );
      }
    }
  );
})
// accept contact tracing manager  request
app.post("/acceptAdmins", (req, res) => {
  const id = req.body.id;
  const place = req.body.place;
  db.query("update covidAssist.web_user set status = 1 where user_id = ?" ,[id], (err, result)=>{
    if(err){
      // console.log("Error in web user update query");
      console.log(err);
      res.send(err);
    }else{
      db.query("insert into covidAssist.contact_tracing_manager(user_id) values (?)",[id],(err, result)=>{
        if(err){
          console.log(err);
          res.send(err);
        }else{
          // console.log("updated");
          res.send("Success")
        }
      })
    }
})
});
// reject the administrator request
app.post("/rejectAdmins", (req, res) => {
  const id = req.body.id;
  const place = req.body.place;
  db.query(
    "update covidAssist.web_user set status = 2 where user_id = ?",
    [id],
    (err, result) => {
      if (err) {
        // console.log("Error in web user update query");
        console.log(err);
        res.send(err);
      } else {
        console.log("updated");
        db.query(
          "select email from web_user where user_id = ?",
          [id],
          (errorEmail, resultEmail) => {
            if (errorEmail) {
              console.log(errorEmail);
            } else {
              console.log(resultEmail);
              var email = resultEmail[0].email;
              let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "g7titans@gmail.com",
                  pass: "titans@123",
                },
              });

              let mailDetails = {
                from: '"CovidAssist Admin" <g7titans@gmail.com>',
                to: email,
                subject: "Vaccine Manager Verification",
                text: `Your request for a vaccine manager at CovidAssist has been rejected.`,
              };

              mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                  console.log("Error Occurs");
                  console.log(err);
                } else {
                  console.log("Email sent successfully");
                }
              });
            }
          }
        );
      }
    }
  );
});

// get vaccine center list

app.get("/getVaccineCenterList", (req, res) => {
  db.query(
    "SELECT vaccine_center.center_id, concat(vaccine_center.name,' ', vaccine_center.district) as center_name FROM covidAssist.vaccine_center  left join covidAssist.vaccine_manager on vaccine_center.center_id = vaccine_manager.center_id where vaccine_manager.user_id is null;",
    (err, result) => {
      if (err) {
        // console.log("Error center");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("Success");
        // console.log(result);
      }
    }
  );
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
    "SELECT COUNT(mobile_user_id) AS countF FROM covidAssist.booking WHERE status=1 AND dose =1 ",
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
    "SELECT COUNT(mobile_user_id) AS countS FROM covidAssist.booking WHERE status=1 AND dose =2",
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
    "SELECT COUNT(booking_id) AS booking FROM covidAssist.booking WHERE is_cancel=0 ",
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
    "SELECT COUNT(mobile_user_id) AS sputnikV1 FROM covidAssist.booking WHERE vaccine_id=1 AND status=1 AND dose=1; ",
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
    "SELECT COUNT(mobile_user_id) AS sputnikV2 FROM covidAssist.booking WHERE status=1 AND vaccine_id=1 AND dose=2;; ",
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
    "SELECT COUNT(mobile_user_id) as astra1 FROM covidAssist.booking WHERE status=1 AND vaccine_id=2 AND dose=1;; ",
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
    "SELECT COUNT(mobile_user_id) as astra2 FROM covidAssist.booking WHERE status=1 AND vaccine_id=2 AND dose=2 ",
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
    "SELECT COUNT(mobile_user_id) as sinopharm1 FROM covidAssist.booking WHERE status=1 AND vaccine_id=3 AND dose1=1 ",
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
    "SELECT COUNT(mobile_user_id) as sinopharm2 FROM covidAssist.booking WHERE status=1 AND vaccine_id=3 AND dose=2 ",
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

app.get("/PieChart1", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user.mobile_user_id) AS piechart1 From covidAssist.mobile_user INNER JOIN covidAssist.booking ON mobile_user.mobile_user_id=booking.mobile_user_id WHERE booking.status = 1 AND (mobile_user.age BETWEEN 18 AND 29) ",
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});
app.get("/PieChart2", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user.mobile_user_id) AS piechart2 From covidAssist.mobile_user INNER JOIN covidAssist.booking ON mobile_user.mobile_user_id=booking.mobile_user_id WHERE booking.status = 1 AND (mobile_user.age BETWEEN 30 AND 59) ",
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});
app.get("/PieChart3", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user.mobile_user_id) AS piechart3 From covidAssist.mobile_user INNER JOIN covidAssist.booking ON mobile_user.mobile_user_id=booking.mobile_user_id WHERE booking.status = 1 AND (mobile_user.age >=60) ",
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.get("/VaccineregPeople", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) AS reg From covidAssist.booking WHERE booking.status = 1  ",
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
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
          "SELECT COUNT(mobile_user_id) AS book FROM covidAssist.booking WHERE center_id=? AND status=0 AND is_cancel=0 ",
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
          "SELECT count(dose) AS count , vaccine.vaccine_name,dose FROM covidAssist.booking INNER JOIN covidAssist.vaccine ON booking.vaccine_id=vaccine.vaccine_id WHERE center_id=? AND date= CURDATE() AND status=0 AND is_cancel=0 group by dose;",
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
          "SELECT COUNT(booking_id) AS booked ,date FROM covidAssist.booking WHERE center_id = ? AND status = 0 AND (datediff(date,CURDATE())=0) AND is_cancel = 0 ORDER BY date ASC",
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
          "SELECT COUNT(booking_id) AS booked ,date FROM covidAssist.booking WHERE center_id = ? AND status = 0 AND (datediff(date,CURDATE())=1) AND is_cancel = 0 ORDER BY date ASC",
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
          "SELECT COUNT(booking_id) AS booked ,date FROM covidAssist.booking WHERE center_id = ? AND status = 0 AND (datediff(date,CURDATE())=2) AND is_cancel = 0 ORDER BY date ASC",
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
          "SELECT COUNT(booking_id) AS booked ,date FROM covidAssist.booking WHERE center_id = ? AND status = 0 AND (datediff(date,CURDATE())=3) AND is_cancel = 0 ORDER BY date ASC",
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
    "SELECT count(booking_id)as total,vaccine_center.center_id,vaccine_center.name,vaccine_center.district,vaccine_center.start_date,vaccine_center.end_date,vaccine_center.longitude,vaccine_center.latitude,vaccine.vaccine_name FROM covidAssist.vaccine_center INNER JOIN covidAssist.vaccine_center_vaccine ON vaccine_center.center_id=vaccine_center_vaccine.vaccine_center_id INNER JOIN covidAssist.vaccine ON vaccine.vaccine_id = vaccine_center_vaccine.vaccine_id INNER JOIN covidAssist.booking ON vaccine_center.center_id=booking.center_id WHERE booking.is_cancel = 0 group by name",

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
    "SELECT facemask.facemask_id,facemask.place_id,facemask.date_time,facemask.facemask_status,iot_device.district,iot_device.place,iot_device.longitude,iot_device.latitude, COUNT(facemask_id) AS facemask FROM covidAssist.facemask INNER JOIN covidAssist.iot_device ON facemask.place_id=iot_device.place_id  group by facemask.place_id",
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
    "SELECT facemask.facemask_id,facemask.place_id,facemask.date_time,facemask.facemask_status,iot_device.district,iot_device.place,iot_device.longitude,iot_device.latitude, COUNT(facemask_id) AS Notmask FROM covidAssist.facemask INNER JOIN covidAssist.iot_device ON facemask.place_id=iot_device.place_id WHERE facemask.facemask_status=0 group by facemask.place_id;",
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
app.get("/bodytempreture", (req, res) => {
  db.query(
    "SELECT temperature.temperature_id,temperature.place_id,temperature.temperature_value,temperature.status,iot_device.district,iot_device.place,iot_device.longitude,iot_device.latitude, count(temperature.temperature_id) AS temperature FROM covidAssist.temperature INNER JOIN covidAssist.iot_device ON temperature.place_id=iot_device.place_id GROUP BY temperature.place_id",
    (error, result) => {
      if (error) {
        console.log("Error bodytemparature");
      } else {
        res.send(result);
        console.log(result);
        console.log("-----------------successfully----------------");
      }
    }
  );
});
app.get("/bodytempreturecount", (req, res) => {
  db.query(
    "SELECT COUNT(facemask_id) AS count ,place_id FROM covidAssist.facemask group by place_id",
    (error, result) => {
      if (error) {
        console.log("Error facemask count");
      } else {
        res.send(result);
        console.log(result);
        console.log("-----------------successfully----------------");
      }
    }
  );
});
//report-vaccine manager
app.get("/firstDoseCount", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS firstDose FROM covidAssist.booking WHERE dose =1 AND status=1 AND center_id = ?",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount[0].firstDose);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});
app.get("/secondDoseCount", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS secondDose FROM covidAssist.booking WHERE dose =2 AND status=1 AND center_id = ?",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount[0].secondDose);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});
app.get("/firstsecondDoseCount", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS firstsecondDose FROM covidAssist.booking WHERE (dose_1 =1 AND dose_2 =1) AND status=1 AND center_id = ?",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount[0].firstsecondDose);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});
app.get("/registerCount", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS registerCount FROM covidAssist.booking WHERE center_id = ? AND is_cancel=0",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount[0].registerCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});
//vaccine manager report chart
app.get("/firstDoseCount1", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS firstDose1 ,date FROM covidAssist.booking WHERE center_id = ? AND dose=1 AND status = 1 AND (datediff(CURDATE(),date)=0) ORDER BY date ASC",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});

app.get("/firstDoseCount2", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS firstDose2 ,date FROM covidAssist.booking WHERE center_id = ? AND dose=1 AND status = 1 AND (datediff(CURDATE(),date)=1) ORDER BY date ASC",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});
app.get("/firstDoseCount3", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS firstDose3 ,date FROM covidAssist.booking WHERE center_id = ? AND dose=1 AND status = 1 AND (datediff(CURDATE(),date)=2) ORDER BY date ASC",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});

app.get("/firstDoseCount4", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS firstDose4 ,date FROM covidAssist.booking WHERE center_id = ? AND dose=1 AND status = 1 AND (datediff(CURDATE(),date)=3) ORDER BY date ASC",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});

app.get("/secondDoseCount1", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS secondDose1 ,date FROM covidAssist.booking WHERE center_id = ? AND dose=2 AND status = 1 AND (datediff(CURDATE(),date)=0) ORDER BY date ASC",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});

app.get("/secondDoseCount2", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS secondDose2 ,date FROM covidAssist.booking WHERE center_id = ? AND dose=2 AND status = 1 AND (datediff(CURDATE(),date)=1) ORDER BY date ASC",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});
app.get("/secondDoseCount3", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS secondDose3 ,date FROM covidAssist.booking WHERE center_id = ? AND dose=2 AND status = 1 AND (datediff(CURDATE(),date)=2) ORDER BY date ASC",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(errorCount);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});
app.get("/secondDoseCount4", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(booking_id) AS secondDose4 ,date FROM covidAssist.booking WHERE center_id = ? AND dose=2 AND status = 1 AND (datediff(CURDATE(),date)=3) ORDER BY date ASC",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});

app.get("/vaccineCenterDistrict", (req, res) => {
  const userid = req.query.id;
  console.log("hhhhhhhhhhhhhhhhhhhhh");
  console.log(userid);
  console.log("hhhhhhhhhhhhhhhhhhhhh");
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT name,district FROM covidAssist.vaccine_center WHERE center_id = ?",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});

app.get("/vaccineName", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT vaccine_id FROM covidAssist.vaccine_center_vaccine WHERE vaccine_center_id=?",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              let vaccineID = resultCount[0].vaccine_id;
              console.log(vaccineID);
              db.query(
                "SELECT vaccine_name FROM covidAssist.vaccine WHERE vaccine_id=?",
                [vaccineID],
                (errorVaccine, resultVaccine) => {
                  if (errorVaccine) {
                    console.log(err);
                  } else {
                    console.log(resultVaccine);
                    res.send(resultVaccine);
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

app.get("/vaccinatedPieChart1", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(mobile_user.mobile_user_id) AS AgeCount1 From covidAssist.mobile_user INNER JOIN covidAssist.booking ON mobile_user.mobile_user_id=booking.mobile_user_id WHERE booking.status = 1 AND (mobile_user.age BETWEEN 18 AND 29) AND booking.center_id = ?",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});

app.get("/vaccinatedPieChart2", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(mobile_user.mobile_user_id) AS AgeCount2 From covidAssist.mobile_user INNER JOIN covidAssist.booking ON mobile_user.mobile_user_id=booking.mobile_user_id WHERE booking.status = 1 AND (mobile_user.age BETWEEN 30 AND 59) AND booking.center_id = ?",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});

app.get("/vaccinatedPieChart3", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(mobile_user.mobile_user_id) AS AgeCount3 From covidAssist.mobile_user INNER JOIN covidAssist.booking ON mobile_user.mobile_user_id=booking.mobile_user_id WHERE booking.status = 1 AND (mobile_user.age >=60) AND booking.center_id = ?",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
      }
    }
  );
});

app.get("/vaccinatedPeople", (req, res) => {
  const userid = req.query.id;
  console.log(userid);
  db.query(
    "SELECT center_id FROM covidAssist.vaccine_manager WHERE user_id=?",
    [userid],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        let centerID = result[0].center_id;
        console.log(centerID);
        db.query(
          "SELECT COUNT(mobile_user_id) AS AgeCountPeople From covidAssist.booking WHERE status = 1 AND booking.center_id = ?",
          [centerID],
          (errorCount, resultCount) => {
            if (errorCount) {
              console.log(err);
            } else {
              console.log(resultCount);
              res.send(resultCount);
            }
          }
        );
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
    "Select vaccine_center.name, vaccine_center.district,vaccine_center.start_date,vaccine_center.end_date, vaccine_manager.user_id, web_user.first_name,web_user.last_name from vaccine_center INNER JOIN vaccine_manager ON vaccine_center.center_id = vaccine_manager.center_id INNER JOIN web_user ON vaccine_manager.user_id = web_user.user_id WHERE vaccine_center.center_id = ?",
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

app.get("/vaccineCenterVaccineDetails", (req, res) => {
  const id = req.query.id;
  console.log(id);
  db.query(
    "Select vaccine_center_vaccine.dose_1_quantity,vaccine_center_vaccine.dose_2_quantity,vaccine_center_vaccine.dose_3_quantity,vaccine.vaccine_name FROM vaccine_center_vaccine INNER JOIN vaccine ON vaccine_center_vaccine.vaccine_id = vaccine.vaccine_id WHERE vaccine_center_vaccine.vaccine_center_id = ?",
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

app.get("/myprofile", (req, res) => {
  const userId = req.query.id;
  console.log(userId);
  db.query(
    "SELECT * FROM web_user WHERE user_id = ?",
    [userId],
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

app.post("/editprofile", (req, res) => {
  const first_name = req.body.firstName;
  const last_name = req.body.lastName;
  const user_name = req.body.username;
  const nic = req.body.nic;
  const email = req.body.email;
  const address = req.body.address;
  const contact_number = req.body.contactNumber;

  db.query(
    "UPDATE web_user SET first_name = ?, last_name = ?, nic = ? , email = ?, address = ? , contact_number = ? WHERE user_name = ?",
    [first_name, last_name, nic, email, address, contact_number, user_name],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        console.log("Ssss");
        res.send("Success");
      }
    }
  );
});

app.get("/getcentercount", (req, res) => {
  db.query(
    "SELECT COUNT(center_id) AS centerCount FROM covidAssist.vaccine_center",
    (err, result) => {
      if (err) {
        console.log("Error count");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("count successful");
        console.log(result);
      }
    }
  );
});

app.get("/getiotcount", (req, res) => {
  db.query(
    "SELECT COUNT(place_id) AS iotCount FROM covidAssist.iot_device",
    (err, result) => {
      if (err) {
        console.log("Error iot");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("successful");
        console.log(result);
      }
    }
  );
});

app.get("/getuserscount", (req, res) => {
  db.query(
    "SELECT COUNT(mobile_user_id) AS userCount FROM covidAssist.mobile_user",
    (err, result) => {
      if (err) {
        console.log("Error user");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("successful");
        console.log(result);
      }
    }
  );
});

app.get("/getrequestcount", (req, res) => {
  db.query(
    "SELECT COUNT(user_id) AS requestCount FROM covidAssist.web_user WHERE status = ?",
    [0],
    (err, result) => {
      if (err) {
        console.log("Error requsets");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log(" successful");
        console.log(result);
      }
    }
  );
});

app.get("/test", (req, res) => {
  console.log("test api");
  const name = "Limal Manjitha";
  const nic = "983091563v";
  const district = "Colombo";
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn("python", ["certi.py", name, nic, district]);
});

app.get("/reservedList", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;

        db.query(
          "SELECT CONCAT(first_name,' ',last_name) AS fullname,vaccine_name,nic,center_id,address,booking_id FROM covidAssist.booking INNER JOIN covidAssist.mobile_user ON booking.mobile_user_id=mobile_user.mobile_user_id INNER JOIN vaccine ON booking.vaccine_id=vaccine.vaccine_id WHERE date=curdate() AND booking.status=0 AND is_cancel=0 AND center_id=?;",
          [vid],
          (err, result) => {
            if (err) {
              console.log("Error center3");
              console.log(err);
              res.send(err);
            } else {
              console.log(result);
              res.send(result);
              console.log("Successhggg123");
              // console.log(result);
            }
          }
        );
      }
    }
  );
});

app.get("/vaccinatedList", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;

        db.query(
          "SELECT CONCAT(first_name,' ',last_name) AS fullname,vaccine_name,nic,center_id,address,booking_id FROM covidAssist.booking INNER JOIN covidAssist.mobile_user ON booking.mobile_user_id=mobile_user.mobile_user_id INNER JOIN vaccine ON booking.vaccine_id=vaccine.vaccine_id WHERE date=curdate() AND booking.status=1 AND is_cancel=0 AND center_id=?;",
          [vid],
          (err, result) => {
            if (err) {
              console.log("Error center1");
              console.log(err);
              res.send(err);
            } else {
              res.send(result);
              console.log("Successhggg");
              // console.log(result);
            }
          }
        );
      }
    }
  );
});

app.get("/confirmvaccine", (req, res) => {
  const id = req.query.book;
  console.log(id);
  console.log("no");
  db.query(
    "UPDATE booking SET status=1 WHERE booking_id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log("Error booking");
        console.log(err);
        res.send(err);
      } else {
        db.query(
          "SELECT booking.mobile_user_id, booking.center_id, booking.vaccine_id,booking.dose, booking.date, mobile_user.first_name, mobile_user.last_name, mobile_user.address, mobile_user.nic, vaccine_center.name , vaccine.vaccine_name FROM booking INNER JOIN mobile_user ON booking.mobile_user_id = mobile_user.mobile_user_id INNER JOIN vaccine_center ON booking.center_id = vaccine_center.center_id INNER JOIN vaccine ON booking.vaccine_id = vaccine.vaccine_id  WHERE booking_id=?",
          [id],
          (errorSelect, resultSelect) => {
            if (errorSelect) {
            } else {
              console.log(resultSelect);
              let userId = resultSelect[0].mobile_user_id;
              let name =
                resultSelect[0].first_name + " " + resultSelect[0].last_name;
              let nic = resultSelect[0].nic;
              let address = resultSelect[0].address;
              let dose = resultSelect[0].dose;
              let vaccine = resultSelect[0].vaccine_name;
              let center = resultSelect[0].name;
              let date = new Date(
                resultSelect[0].date.toISOString().substring(0, 10)
              );
              date.setDate(date.getDate() + 1);
              let newDate = date.toISOString().substring(0, 10);
              console.log(date.toISOString().substring(0, 10));
              if (dose == 1) {
                const spawn = require("child_process").spawn;
                const pythonProcess = spawn("python", [
                  "certi.py",
                  name,
                  nic,
                  address,
                  vaccine,
                  center,
                  newDate,
                ]);
              } else if (dose == 2) {
                db.query(
                  "SELECT * FROM booking WHERE mobile_user_id = ? AND status = ? AND dose = ?",
                  [userId, 1, 1],
                  (errorUser, resultUser) => {
                    if (errorUser) {
                      console.log(errorUser);
                    } else {
                      console.log("===========");
                      console.log(resultUser.length);
                      if (resultUser.length > 0) {
                        let bookingId = resultUser[0].booking_id;
                        db.query(
                          "SELECT booking.mobile_user_id, booking.center_id, booking.vaccine_id,booking.dose, booking.date, mobile_user.first_name, mobile_user.last_name, mobile_user.address, mobile_user.nic, vaccine_center.name , vaccine.vaccine_name FROM booking INNER JOIN mobile_user ON booking.mobile_user_id = mobile_user.mobile_user_id INNER JOIN vaccine_center ON booking.center_id = vaccine_center.center_id INNER JOIN vaccine ON booking.vaccine_id = vaccine.vaccine_id  WHERE booking_id=?",
                          [bookingId],
                          (errorDoseOne, resultDoseOne) => {
                            if (errorDoseOne) {
                              console.log(errorDoseOne);
                            } else {
                              console.log("$$$$$$$$$");
                              let vaccine1 = resultDoseOne[0].vaccine_name;
                              let center1 = resultDoseOne[0].name;
                              let date1 = new Date(
                                resultDoseOne[0].date
                                  .toISOString()
                                  .substring(0, 10)
                              );
                              date1.setDate(date1.getDate() + 1);
                              let newDate1 = date1
                                .toISOString()
                                .substring(0, 10);
                              for (let i = 0; i < 2; i++) {
                                const spawn = require("child_process").spawn;
                                const pythonProcess = spawn("python", [
                                  "certi2.py",
                                  name,
                                  nic,
                                  address,
                                  vaccine,
                                  center,
                                  newDate,
                                  vaccine1,
                                  center1,
                                  newDate1,
                                ]);
                              }
                            }
                          }
                        );
                      }
                    }
                  }
                );
              }
            }
            // console.log(resultSelect[0].booking_id);
            // let dose = resultSelect[0].dose;
            // let userId = resultSelect[0].mobile_user_id;
          }
        );
        // res.send("Success book");
        console.log("Success");
        // console.log(result);
      }
    }
  );
});

app.get("/getcenterdistrict", (req, res) => {
  db.query(
    "SELECT COUNT(covidAssist.vaccine_center.center_id) as value, covidAssist.vaccine_center.district as activity FROM covidAssist.vaccine_center group by covidAssist.vaccine_center.district",
    (err, result) => {
      if (err) {
        console.log("Error center district");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log(" successful");
        console.log(result);
      }
    }
  );
});
app.get("/upcommingbookings", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;

        db.query(
          "SELECT CONCAT(first_name,' ',last_name) AS fullname,vaccine_name,date,nic,center_id,address,booking_id FROM covidAssist.booking INNER JOIN covidAssist.mobile_user ON booking.mobile_user_id=mobile_user.mobile_user_id INNER JOIN vaccine ON booking.vaccine_id=vaccine.vaccine_id WHERE date>curdate() AND booking.status=0 AND is_cancel=0 AND center_id=?",
          [vid],
          (err, result) => {
            if (err) {
              console.log("Error center2");
              console.log(err);
              res.send(err);
            } else {
              res.send(result);
              console.log(result);
              // console.log(result);
            }
          }
        );
      }
    }
  );
});
app.get("/getvaccinecenter", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;

        db.query(
          "SELECT name FROM vaccine_center WHERE center_id=?;",
          [vid],
          (err, result) => {
            if (err) {
              console.log("Error center");
              console.log(err);
              res.send(err);
            } else {
              res.send(result);
              console.log(result);
              // console.log(result);
            }
          }
        );
      }
    }
  );
});
app.get("/RegisterDetails", (req, res) => {
  const id = req.query.id;
  console.log("no id found");
  console.log(id);
  db.query(
    "SELECT CONCAT(first_name,' ',last_name) AS fullname,date,dose,time,id_type,nic,address,gender,booking_id FROM covidAssist.booking INNER JOIN mobile_user ON booking.mobile_user_id=mobile_user.mobile_user_id WHERE booking.booking_id=?;",
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
app.get("/BookedVaccine", (req, res) => {
  const id = req.query.id;
  console.log("no id found");
  console.log(id);
  db.query(
    "SELECT vaccine_name FROM covidAssist.booking INNER JOIN vaccine ON booking.vaccine_id=vaccine.vaccine_id WHERE booking.booking_id=?;",
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
app.get("/bookingcount", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;
  db.query(
    "SELECT count(booking_id)as total_bookings FROM covidAssist.booking WHERE is_cancel=0 AND date=curdate() AND center_id=?",
    [vid],
    (err, result) => {
      if (err) {
        console.log("Error count");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("count successful");
        console.log(result);
       }
     }
   );
  }
 }
);
});
app.get("/getCompletedbookings", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;
  db.query(
    "SELECT count(booking_id) as completed_bookings FROM covidAssist.booking WHERE status=1 AND is_cancel=0 AND date=curdate() AND center_id=?",
    [vid],
    (err, result) => {
      if (err) {
        console.log("Error count");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("count successful");
        console.log(result);
       }
     }
   );
  }
 }
);
});
app.get("/getcancelcount", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;
  db.query(
    "SELECT count(booking_id) as canceled_bookings FROM covidAssist.booking WHERE is_cancel=1 AND date=curdate() AND center_id=?",
    [vid],
    (err, result) => {
      if (err) {
        console.log("Error count");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("count successful");
        console.log(result);
       }
     }
   );
  }
 }
);
});
app.get("/getVaccine", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;
  db.query(
    "SELECT vaccine_name FROM covidAssist.vaccine_center_vaccine INNER JOIN vaccine ON vaccine_center_vaccine.vaccine_id=vaccine.vaccine_id WHERE vaccine_center_vaccine.vaccine_center_id=?",
    [vid],
    (err, result) => {
      if (err) {
        console.log("Error count");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("count successful");
        console.log(result);
       }
     }
   );
  }
 }
);
});
app.get("/monthlybookings", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;
  db.query(
    "SELECT count(booking_id)as total_bookings FROM covidAssist.booking WHERE month(date)=month(CURRENT_DATE()) AND YEAR(CURRENT_DATE())=YEAR(date) AND is_cancel=0 AND center_id=?",
    [vid],
    (err, result) => {
      if (err) {
        console.log("Error count");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("count successful");
        console.log(result);
       }
     }
   );
  }
 }
);
});

app.get("/monthlycompletedbookings", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;
  db.query(
    "SELECT count(booking_id)as completed_bookings FROM covidAssist.booking WHERE month(date)=month(CURRENT_DATE()) AND YEAR(CURRENT_DATE())=YEAR(date) AND status=1 AND center_id=?",
    [vid],
    (err, result) => {
      if (err) {
        console.log("Error count");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log("count successful");
        console.log(result);
       }
     }
   );
  }
 }
);
});
app.get("/getupcomingbookingsdate", (req, res) => {
  const userId = req.query.id;
  db.query(
    "Select center_id from vaccine_manager WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result[0].center_id);
        const vid = result[0].center_id;
  db.query(
    "SELECT count(booking.booking_id) as value, cast(booking.date as date) as activity FROM booking WHERE status=0 AND is_cancel=0 AND center_id=? GROUP BY date ORDER BY date ASC limit 4",
    [vid],
    (err, result) => {
      if (err) {
        console.log("Error center district");
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
        console.log(" successful");
        console.log(result);
      }
    }
  );
}
}
);
});

app.post("/addTemperatureReport", (req, res) => {
  console.log(req.body);
  // console.log(req);
  // console.log("sssss");
  for (let i = 0; i < req.body.length - 1; i++) {
    const time = req.body[i].time;
    const placeId = req.body[i].place_id;
    const temperature = req.body[i].Temperature;
    db.query(
      "INSERT INTO temperature(place_id,temperature_value,date_time,status) VALUES(?,?,?,?)",
      [placeId, temperature, time, 1],
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Success");
        }
      }
    );
  }
  res.send("Success");
});

app.get("/getVaccines", (req, res) => {
  db.query("SELECT vaccine_name FROM vaccine", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.listen(3002, () => {
  console.log("your server is running port 3002");
});
