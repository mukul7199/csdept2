const fs = require("fs");
const path = require("path");
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

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumb", maxCount: 1 }
  ]),
  (req, res) => {
    // console.log(req.files.image[0].path);
    // console.log(req.files.thumb[0].path);
    // res.send("HI");
    const calendar = new Calendar({
      title: req.body.title,
      image: req.files.image[0].path,
      thumb: req.files.thumb[0].path
    });
    calendar
      .save()
      .then(calendar => res.send(calendar))
      .catch(e => res.status(400).send(e));
  }
);

router.delete("/:sem", (req, res) => {
  const sem = req.params.sem;
  Calendar.findOne({ title: sem })
    .then(calendar => {
      let image = calendar.image;
      let thumb = calendar.thumb;
      var imagePath = path.join(__dirname + `/../${image}`);
      var thumbPath = path.join(__dirname + `/../${thumb}`);
      fs.unlinkSync(imagePath);
      fs.unlinkSync(thumbPath);
      Calendar.findOneAndDelete({ title: sem }).then(calendar => {
        res.send(calendar);
      });
    })
    .catch(e => res.send(e));
});

module.exports = router;
