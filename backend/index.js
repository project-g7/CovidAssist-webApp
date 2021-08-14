const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const crypto = require('crypto');


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
  const hash = crypto.createHash('md5').update(password).digest('hex');

  db.query(
    "SELECT * FROM web_user WHERE user_name = ? AND status = 1",
    [user_name],
    (err, result) => {
      if (err) {
        res.send({err:err});
      }
      if(result.length>0) {
        res.send( {message: "This username has already taken"});
      }else{
        db.query(
            "SELECT * FROM web_user WHERE email = ? AND status = 1",
            [email],
            (err, result) => {
              if (err) {
                res.send({err:err});
              }
              if(result.length>0) {
                res.send( {message: "This email has already taken"});
              }else{
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
                        res.send({message:"Success"});
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
  const hashpass = crypto.createHash('md5').update(password).digest('hex');

  db.query(
    "SELECT * FROM web_user WHERE user_name = ? AND password = ? AND status = 1",
    [user_name, hashpass],
    (err, result) => {
      if (err) {
        res.send({err:err});
      }
      if(result.length>0) {
        res.send(result);
        console.log(result);
        console.log(user_name + " " + password);
      } else {
        res.send({ message: "Wrong username / password combination" });
        console.log( "Wrong username and password combination" );
      }
    }
  ); 
});

app.listen(3002, () => {
  console.log("your server is running port 3002");
});
