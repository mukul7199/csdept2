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

router.delete("/:id", (req, res) => {
  Email.findByIdAndDelete(req.params.id).then(emailId => {
    res.send(emailId);
  });
});

// router.delete("/", (req, res) => {
//   Email.deleteMany().then(res.send({ message: "done" }));
// });

module.exports = router;
