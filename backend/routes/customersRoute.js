var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "classicmodels"
});

connection.connect();

connection.query("SELECT * FROM customers", function(err, rows, fields) {
  if (err) throw err;

  console.log("The solution is: ", rows);
});

connection.end();
