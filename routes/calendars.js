const express = require("express");
const Calendar = require("../models/Calendar");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", (req, res) => {
  Calendar.find()
    .sort([["title", "ascending"]])
    .then(calendars => {
      res.send({
        count: calendars.length,
        calendars: calendars
      });
    })
    .catch(e => console.log(e));
});

router.post("/", upload.single("image"), (req, res) => {
  const calendar = new Calendar({
    title: req.body.title,
    image: req.file.path
  });
  calendar
    .save()
    .then(calendar => res.send(calendar))
    .catch(e => res.status(400).send(e));
});

router.delete("/:sem", (req, res) => {
  const sem = req.params.sem;
  Calendar.findOneAndDelete({ title: sem })
    .then(response => {
      res.send({ response });
    })
    .catch(e => console.log(e));
});

module.exports = router;
