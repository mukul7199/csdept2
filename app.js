const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const events = require("./routes/events");

const port = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://mukul8299:mukul123@ds151247.mlab.com:51247/deptwebsite";
const app = express();

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
mongoose.set("useCreateIndex", true);

app.use(function(req, res, next) {
  var allowedOrigins = ["http://localhost:3000", "https://localhost:3000"];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, err => {
  if (err) return console.log(err);
  console.log("Mongoose connected");
});

app.get("/", (req, res) => {
  res.send({
    message: "Welcome"
  });
});

app.use("/events", events);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
