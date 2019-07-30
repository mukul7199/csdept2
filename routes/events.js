const express = require("express");
const Event = require("../models/Event");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", (req, res) => {
  Event.find()
    .then(events => {
      res.send({
        count: events.length,
        events: events
      });
    })
    .catch(e => console.log(e));
});

router.post("/", upload.single("image"), (req, res) => {
  const event = new Event({
    title: req.body.title,
    body: req.body.body,
    image: req.file.path
  });
  event
    .save()
    .then(event => res.send(event))
    .catch(e => res.status(400).send(e));
});

module.exports = router;
