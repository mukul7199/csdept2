const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./config");
const events = require("./routes/events");
const news = require("./routes/news");
const calendars = require("./routes/calendars");
const showcaseItems = require("./routes/showcaseItems");
const emails = require("./routes/emails");

const port = process.env.PORT || config.PORT;
const MONGODB_URI = process.env.MONGODB_URI || config.MongoDB_URI;
const app = express();

// app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
mongoose.set("useCreateIndex", true);

app.use((req, res, next) => {
  // var allowedOrigins = ["http://localhost:3000", "https://localhost:3000"];
  // var origin = req.headers.origin;
  // if (allowedOrigins.indexOf(origin) > -1) {
  res.header("Access-Control-Allow-Origin", "*");
  // return next();
  // }
  // res.header(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  // );
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
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
app.use("/news", news);
app.use("/calendars", calendars);
app.use("/showcaseItems", showcaseItems);
app.use("/emails", emails);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
