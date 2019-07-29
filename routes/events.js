const express = require("express");
const multer = require("multer");
const Event = require("../models/Event");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
      cb(null, true);
    else cb("Uploaded file is not an image", false);
  }
});

router.get("/", (req, res) => {
  Event.find()
    .then(events => res.send(events))
    .catch(e => console.log(e));

  // res.send({ message: "Events route" });
});

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  // console.log(new Date().toUTCString());
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
