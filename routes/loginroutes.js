require("dotenv").config();
var mysql = require("mysql");
var jsonfile = require("jsonfile");

var db_config = {
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "b168a3716d34ba",
  password: process.env.DB_PASSWORD,
  database: "heroku_9914b8101fa5760",
  insecureAuth: false
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  connection.connect(function(err) {
    if (!err) {
      console.log(
        "heroku_9914b8101fa5760 (classicmodels) database is connected for login route... nn"
      );
    } else {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  connection.on("error", function(err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

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
