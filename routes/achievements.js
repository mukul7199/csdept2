const express = require("express");
const multer = require("multer");
const moment = require("moment");
const Achievement = require("../models/Achievement");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", (req, res) => {
  Achievement.find()
    .sort([["date", "descending"]])
    .then(achievements => {
      res.send({ achievements });
    })
    .catch(e => console.log(e));
});

router.post("/", upload.single("image"), (req, res) => {
  let formattedDate = moment(req.body.date, "DD-MM-YYYY").format(
    "MMMM Do YYYY"
  );
  let date = moment(req.body.date, "DD-MM-YYYY").format("x");
  const achievement = new Achievement({
    title: req.body.title,
    body: req.body.body,
    image: req.file.path,
    date,
    formattedDate
  });
  achievement
    .save()
    .then(achievement => res.send(achievement))
    .catch(e => res.status(400).send(e));
});

module.exports = router;
