const express = require("express");
const moment = require("moment");
const News = require("../models/News");
const router = express.Router();

router.get("/", (req, res) => {
  News.find()
    .then(news => {
      const now = moment().format("x");
      news.forEach(n => {
        console.log(n.date);
        console.log(now);
        console.log(n.date < now);
      });
      res.send({
        count: news.length,
        news: news
      });
    })

    .catch(e => console.log(e));
});

router.post("/", (req, res) => {
  let date = moment(req.body.date).format("x");

  const news = new News({
    title: req.body.title,
    body: req.body.body || req.body.title,
    date: date
  });
  news
    .save()
    .then(news => res.send(news))
    .catch(e => res.status(400).send(e));
});

module.exports = router;
