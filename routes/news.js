const express = require("express");
const moment = require("moment");
const News = require("../models/News");
const router = express.Router();

router.get("/", (req, res) => {
  News.deleteMany({
    date: {
      $lte: moment()
        .subtract(5, "days")
        .format("x")
    }
  })
    .then(deleted => {
      console.log(deleted);
      News.find().then(news => {
        res.send({
          count: news.length,
          news: news
        });
      });
    })
    .catch(e => console.log(e));
});

router.post("/", (req, res) => {
  let formattedDate = moment(req.body.date, "DD-MM-YYYY").format(
    "MMMM Do YYYY"
  );
  let date = moment(req.body.date, "DD-MM-YYYY").format("x");

  const news = new News({
    title: req.body.title,
    body: req.body.body || req.body.title,
    formattedDate,
    date
  });
  news
    .save()
    .then(news => res.send(news))
    .catch(e => res.status(400).send(e));
});

module.exports = router;
