var express = require("express");
var login = require("./routes/loginroutes");
var customersRoutes = require("./routes/customersRoutes");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var router = express.Router();

// test route
// router.get("/", function(req, res) {
//   res.json({ message: "welcome to our apis" });
// });
router.post("/register", login.register);
router.post("/login", login.login);
router.get("/customernames", customersRoutes.customernames);
router.post("/customerfilter", customersRoutes.customerfilter);
router.post("/customerorderinfo", customersRoutes.customerorderinfo);
app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    // res.json({ message: "welcome to our apis" });
    // res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(Number(process.env.PORT || 4000));
