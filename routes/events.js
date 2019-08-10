const express = require("express");
const moment = require("moment");
const Event = require("../models/Event");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", (req, res) => {
  Event.find()
    .sort([["date", "descending"]])
    .then(events => {
      res.send({
        count: events.length,
        events: events
      });
    })
    .catch(e => console.log(e));
});

router.post("/", upload.single("image"), (req, res) => {
  let formattedDate = moment(req.body.date, "DD-MM-YYYY").format(
    "MMMM Do YYYY"
  );
  let date = moment(req.body.date, "DD-MM-YYYY").format("x");
  const event = new Event({
    title: req.body.title,
    body: req.body.body,
    image: req.file.path,
    date,
    formattedDate
  });
  event
    .save()
    .then(event => res.send(event))
    .catch(e => res.status(400).send(e));
});

// router.delete("/", (req, res) => {
//   Event.deleteMany({}).then(response => res.send(response));
// });

module.exports = router;
