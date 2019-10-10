const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const Email = require("../models/Email");
const Token = require("../models/Token");
const config = require("../config");

const senderId = config.SENDER_EMAIL_ID;
const senderPassword = config.SENDER_PASSWORD;
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
      var token = new Token({
        _userId: email._id,
        token: crypto.randomBytes(16).toString("hex")
      });

      // Save the verification token
      token.save().then(token => {
        sgMail.setApiKey(
          "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" ||
            process.snv.SENDGRID_API_KEY
        );
        const msg = {
          to: emailId,
          from: "LNCTS CSE <lnctscse@gmail.com>",
          subject: "Thanks for subscribing with us",
          html: `
            <h1>You are now subscribed!</h1>
            <h2>Thanks for registering your email id with us</h2>
            <p>You have been added to our mailing list. Please verify your email address by clicking on <a href=${"https://csdept-api.herokuapp.com/confirmation/" +
              token.token}>link</a></p>
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
});

router.delete("/:id", (req, res) => {
  Email.findByIdAndDelete(req.params.id).then(emailId => {
    res.send(emailId);
  });
});

// router.get("/send", (req, res) => {
//   let emailArr = [];
//   Email.find()
//     .then(emails => {
//       for (var i = 0; i < emails.length; i++) {
//         emailArr.push(emails[i].id);
//       }
//     })
//     .then(() => {
//       // using Twilio SendGrid's v3 Node.js Library
//       // https://github.com/sendgrid/sendgrid-nodejs
//       const sgMail = require("@sendgrid/mail");

//     });
// });

router.delete("/", (req, res) => {
  Email.deleteMany().then(res.send({ message: "done" }));
});

module.exports = router;
