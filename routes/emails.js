const express = require("express");
const nodemailer = require("nodemailer");
const Email = require("../models/Email");
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
  const emailId = req.body.id;
  // Email.find({ id: emailId })
  //   .then(emails => {
  //     if (emails.length > 0)
  //       res.send({ message: "Email is already registered" });
  //     else {
  //       let transporter = nodemailer.createTransport({
  //         service: "gmail",
  //         auth: {
  //           user: senderId,
  //           pass: senderPassword
  //         }
  //       });
  //       let helperOptions = {
  //         from: "LNCTS <lnctscse@gmail.com>",
  //         to: emailId,
  //         subject: "First email that you get on registering",
  //         html: `
  //         <h1>Title</h1>
  //         <h2>subtitle</h2>
  //         <p>body in paragraphs</p>
  //         <p>body in paragraphs</p>
  //         <p>body in paragraphs</p>
  //       `
  //       };
  //       transporter.sendMail(helperOptions).then(info => {
  //         console.log(info.accepted.length);
  //         if (info.accepted.length > 0) {
  //           const email = new Email({
  //             id: emailId
  //           });
  //           email
  //             .save()
  //             .then(email =>
  //               res.send({ message: "Thanks for subscribing with us" })
  //             )
  //             .catch(e => res.status(400).send(e));
  //         } else {
  //           res.send({ message: "email is not valid" });
  //         }
  //       });
  //     }
  //   })
  //   .catch(e => console.log(e));
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderId,
      pass: senderPassword
    }
  });
  let helperOptions = {
    from: "LNCTS <lnctscse@gmail.com>",
    to: emailId,
    subject: "First email that you get on registering",
    html: `
          <h1>You are now subscribed!</h1>
          <h2>Thanks for registering your email id with us</h2>
          <p>You have been added to our mailing list</p>
          <p>Check out LNCTS CSE <a href="#">here</a></p>
        `
  };
  transporter.sendMail(helperOptions);
  const email = new Email({
    id: emailId
  });
  email
    .save()
    .then(email => res.send({ email }))
    .catch(e => res.status(400).send(e));
});

router.delete("/:id", (req, res) => {
  Email.findByIdAndDelete(req.params.id).then(emailId => {
    res.send(emailId);
  });
});

router.get("/send", (req, res) => {
  let emailArr = [];
  Email.find()
    .then(emails => {
      for (var i = 0; i < emails.length; i++) {
        emailArr.push(emails[i].id);
      }
    })
    .then(() => {
      // using Twilio SendGrid's v3 Node.js Library
      // https://github.com/sendgrid/sendgrid-nodejs
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: emailArr,
        from: "lnctscse@gmail.com",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>"
      };
      sgMail.send(msg);
      res.send("SENT");
    });
});

router.delete("/", (req, res) => {
  Email.deleteMany().then(res.send({ message: "done" }));
});

module.exports = router;
