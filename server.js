var express = require("express");
var login = require("./routes/loginroutes");
var customersRoutes = require("./routes/customersRoutes");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

// test route
router.get("/", function(req, res) {
  res.json({ message: "welcome to our apis" });
});

router.post("/register", login.register);
router.post("/login", login.login);
router.get("/customernames", customersRoutes.customernames);
router.post("/customerfilter", customersRoutes.customerfilter);
router.post("/customerorderinfo", customersRoutes.customerorderinfo);
app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 4000);
