const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const config = require("./config");
const Email = require("./models/Email");
const news = require("./routes/news");
const events = require("./routes/events");
const emails = require("./routes/emails");
const schemes = require("./routes/schemes");
const syllabus = require("./routes/syllabus");
const calendars = require("./routes/calendars");
const achievements = require("./routes/achievements");
const showcaseItems = require("./routes/showcaseItems");

const port = process.env.PORT;
const MONGODB_URI = config.MongoDB_URI;
const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
mongoose.set("useCreateIndex", true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, err => {
  if (err) return console.log(err);
  console.log("Mongoose connected");
});

app.get("/", (req, res) => {
  res.send({
    message: "Welcome"
  });
});

app.get("/confirmation/:token", (req, res) => {
  const token = req.params.token;
  var data = jwt.decode(token, process.env.EMAIL_SECRET);
  if (new Date(data.expiry) > new Date()) {
    Email.findOne({ id: data.email.id }).exec(function(err, email) {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (!email) {
        res.send({ msg: "User not found" });
      } else {
        email.isVerified = true;
        email
          .save()
          .then(email => res.send({ msg: "Verified" }))
          .catch(e => res.send(e));
      }
    });
  }
});

app.use("/news", news);
app.use("/events", events);
app.use("/emails", emails);
app.use("/schemes", schemes);
app.use("/syllabus", syllabus);
app.use("/calendars", calendars);
app.use("/achievements", achievements);
app.use("/showcaseItems", showcaseItems);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
