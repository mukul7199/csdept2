const express = require("express");
const Email = require("../models/Email");
const router = express.Router();

router.get("/", (req, res) => {
  Email.find()
    .then(emails => {
      res.send({
        count: emails.length,
        emails: emails
      });
    })
    .catch(e => console.log(e));
});

router.post("/", (req, res) => {
  const email = new Email({
    id: req.body.id
  });
  email
    .save()
    .then(email => res.send(email))
    .catch(e => res.status(400).send(e));
});

module.exports = router;
