require("dotenv").config();
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "classicmodels"
});

exports.customers = function(req, res) {
  connection.connect(function(err) {
    if (!err) {
      console.log("Customer database is connected ... nn");
    } else {
      console.log("Error connecting to customer database ... nn", err);
    }
  });
  connection.query("SELECT * FROM customers", function(err, rows, fields) {
    if (err) {
      console.log("error ocurred fetching customer data", err);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      res.send({
        code: 200,
        success: "customer data received",
        data: rows
      });
    }
  });
};
