var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "classicmodels"
});

connection.connect(function(err) {
  if (!err) {
    console.log("Customer database is connected ... nn");
  } else {
    console.log("Error connecting to customer database ... nn", err);
  }
});

connection.query("SELECT * FROM customers", function(err, rows, fields) {
  if (err) throw err;

  console.log("The solution is: ", rows);
});

connection.end();
