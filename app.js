const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const events = require("./routes/events");

const port = process.env.PORT || 3000;
const app = express();

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
mongoose.set("useCreateIndex", true);

mongoose.connect(
  "mongodb://mukul8299:mukul123@ds151247.mlab.com:51247/deptwebsite",
  {
    useNewUrlParser: true
  },
  err => {
    if (err) return console.log(err);
    console.log("Mongoose connected");
  }
);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome"
  });
});

app.use("/events", events);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
