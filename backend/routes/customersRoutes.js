require("dotenv").config();
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "classicmodels"
});

connection.connect(function(err) {
  if (!err) {
    console.log("classicmodels database is connected ... nn");
  } else {
    console.log("Error connecting to classicmodels database ... nn", err);
  }
});

exports.customernames = function(req, res) {
  connection.query("SELECT customername FROM customers", function(
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log("error ocurred fetching customer name", err);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      res.send({
        code: 200,
        success: "customer names received",
        customerData: rows
      });
    }
  });
};

exports.customerfilter = function(req, res) {
  const selectedCustomer = "('ANG Resellers')";
  connection.query(
    "SELECT customername FROM customers WHERE customername = " +
      selectedCustomer,
    function(err, rows, fields) {
      if (err) {
        console.log("error ocurred filtering customer name", err);
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        res.send({
          code: 200,
          success: "customer names filtered",
          customerData: rows
        });
      }
    }
  );
};
