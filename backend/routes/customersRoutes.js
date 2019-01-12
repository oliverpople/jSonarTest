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
  connection.query(
    "SELECT customername, customernumber FROM customers",
    function(err, rows, fields) {
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
    }
  );
};

exports.customerfilter = function(req, res) {
  var nameForFilter = req.body.nameForFilter;
  const nameForFilterReadyForQuery = '"' + nameForFilter + '";';
  connection.query(
    "SELECT customername FROM customers WHERE customername = " +
      nameForFilterReadyForQuery,
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

exports.customerorderinfo = function(req, res) {
  var costumerNumber = req.body.customerNumberForInfoReq;
  connection.query(
    "SELECT * FROM orders CROSS JOIN orderdetails CROSS JOIN products WHERE customernumber = " +
      costumerNumber +
      " and orders.orderNumber = orderdetails.orderNumber and orderdetails.productCode = products.productCode ORDER BY orders.orderDate;",
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
