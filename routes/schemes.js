const fs = require("fs");
const path = require("path");
const express = require("express");
const Scheme = require("../models/Scheme");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", (req, res) => {
  Scheme.find().then(schemes => {
    res.send({
      count: schemes.length,
      schemes
    });
  });
});

router.post("/", upload.single("file"), (req, res) => {
  const scheme = new Scheme({
    title: req.body.title,
    file: req.file.path
  });

  scheme
    .save()
    .then(scheme => {
      res.send(scheme);
    })
    .catch(e => console.log(e));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Scheme.findById(id).then(item => {
    const file = item.file;
    const filePath = path.join(__dirname + `/../${file}`);
    fs.unlinkSync(filePath);
    Scheme.findByIdAndDelete(id)
      .then(scheme => res.send(scheme))
      .catch(e => console.log(e));
  });
});

module.exports = router;
