require("dotenv").config();
var mysql = require("mysql");
var db_config = {
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "b168a3716d34ba",
  password: process.env.DB_PASSWORD,
  database: "heroku_9914b8101fa5760"
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function(err) {
    if (!err) {
      console.log(
        "heroku_9914b8101fa5760 (classicmodels) database is connected ... nn"
      );
      // The server is either down
    } else {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function(err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

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
          customerIdData: rows
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
          customerNameData: rows
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
          customerInfoData: rows
        });
      }
    }
  );
};
