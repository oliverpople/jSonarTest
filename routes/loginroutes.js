require("dotenv").config();
var mysql = require("mysql");
var jsonfile = require("jsonfile");
// var connection = mysql.createConnection({
//   host: "srv-captain--mysql-container",
//   user: "root",
//   password: process.env.DB_PASSWORD,
//   database: "jsonar_db",
//   insecureAuth: false
// });
//
// connection.connect(function(err) {
//   if (!err) {
//     console.log("User account database is connected ... nn");
//   } else {
//     console.log("Error connecting to user account database ... nn", err);
//   }
// });

exports.register = function(req, res) {
  var today = new Date();
  //save to db
  var users = {
    username: req.body.username,
    password: req.body.password,
    created: today,
    modified: today
  };
  connection.query("INSERT INTO users SET ?", users, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      res.send({
        code: 200,
        success: "user registered sucessfully"
      });
    }
  });
};

exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    function(error, results, fields) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        if (results.length > 0) {
          if (results[0].password == req.body.password) {
            var file = "./userdata/username.json";
            var obj = { username: req.body.username };
            jsonfile.writeFile(file, obj, function(err) {
              if (err) {
                console.log(
                  "Error ocurred in writing json during login at login handler in login routes",
                  err
                );
              }
            });
            res.send({
              code: 200,
              success: "login sucessfull"
            });
          } else {
            res.send({
              code: 204,
              success: "username and password does not match"
            });
          }
        } else {
          res.send({
            code: 204,
            success: "username does not exits"
          });
        }
      }
    }
  );
};
