const express = require("express");
const moment = require("moment");
const ShowcaseItem = require("../models/ShowcaseItem");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", (req, res) => {
  ShowcaseItem.find()
    .then(items => {
      res.send({
        count: items.length,
        items: items
      });
    })
    .catch(e => console.log(e));
});

router.post("/", upload.single("image"), (req, res) => {
  let date = moment(req.body.date, "DD-MM-YYYY").format("x");
  const item = new ShowcaseItem({
    title: req.body.title,
    date: date,
    image: req.file.path,
    redirect: req.body.redirect
  });
  item
    .save()
    .then(item => res.send(item))
    .catch(e => res.status(400).send(e));
});

router.delete("/", (req, res) => {
  ShowcaseItem.deleteMany({}).then(items => {
    res.send(items);
  });
});

module.exports = router;
