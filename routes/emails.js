const express = require("express");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
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
  // Make sure the email doesn't exist already
  Email.find({ id: req.body.id }).then(user => {
    if (user.length > 0)
      return res.send({ message: "This email already exists!" });
    const emailId = req.body.id;
    const email = new Email({ id: emailId });
    email.save().then(email => {
      // Create a new verification token for this email
      var info = {
        email: email,
        expiry: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      };

      var token = jwt.sign(info, process.env.EMAIL_SECRET);
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: emailId,
        from: "LNCTS CSE <lnctscse@gmail.com>",
        subject: "Thanks for subscribing with us",
        html: `
            <h1>You are now subscribed!</h1>
            <h2>Thanks for registering your email id with us</h2>
            <p>You have been added to our mailing list. Please verify your email address by clicking on
             <a href=${"https://csdept-api.herokuapp.com/confirmation/" +
               token}>link</a></p>
            <p>Check out LNCTS CSE <a href="#">here</a></p>
          `
      };
      sgMail.send(msg);
      res.send({
        message: "Thanks for subscribing!"
      });
    });
  });
});

router.delete("/:id", (req, res) => {
  Email.findByIdAndDelete(req.params.id).then(emailId => {
    res.send(emailId);
  });
});

module.exports = router;
