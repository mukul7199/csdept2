const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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

const port = config.PORT;
const MONGODB_URI = config.MongoDB_URI;
const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
mongoose.set("useCreateIndex", true);

// app.use((req, res, next) => {
//   // var allowedOrigins = ["http://localhost:3000", "https://localhost:3000"];
//   // var origin = req.headers.origin;
//   // if (allowedOrigins.indexOf(origin) > -1) {

//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   // return next();
//   // }
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", true);
//   return next();
// });

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
  if (!token)
    return res.send({
      msg: "We were unable to find a valid token. Your token my have expired."
    });

  Email.findOne({ _id: token._userId }).then(user => {
    if (!user)
      return res.send({
        msg: "We were unable to find a valid user for this token"
      });
    if (user.isVerified)
      return res.send({ msg: "This user has already been verified." });
    user.isVerified = true;
    user.save.then(() => {
      res.send({ msg: "The account has been verified" });
    });
  });
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
