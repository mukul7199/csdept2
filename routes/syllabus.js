const fs = require("fs");
const path = require("path");
const express = require("express");
const Syllabus = require("../models/Syllabus");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", (req, res) => {
  Syllabus.find().then(syllabus => {
    res.send({
      count: syllabus.length,
      syllabus
    });
  });
});

router.post("/", upload.single("file"), (req, res) => {
  const syllabus = new Syllabus({
    title: req.body.title,
    file: req.file.path
  });

  syllabus
    .save()
    .then(syllabus => {
      res.send(syllabus);
    })
    .catch(e => console.log(e));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Syllabus.findById(id).then(item => {
    const file = item.file;
    const filePath = path.join(__dirname + `/../${file}`);
    fs.unlinkSync(filePath);
    Syllabus.findByIdAndDelete(id)
      .then(syllabus => res.send(syllabus))
      .catch(e => console.log(e));
  });
});

module.exports = router;
