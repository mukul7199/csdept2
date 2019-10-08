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
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: senderId, // "lnctscse@mail.ee", // senderId,
          pass: senderPassword // "q7cEZz*2v4rKtQs"
        }
      });

      console.log("created");
      console.log(emailArr);

      let helperOptions = {
        from: "LNCTS <lnctscse@gmail.com>",
        to: emailArr,
        subject: "subject",
        html: `
            <h1>HI</h1>
            <h2>HI</h2>
            <p>HI</p>
          `
      };

      transporter
        .sendMail(helperOptions)
        .then(info => res.send(info))
        .catch(e => console.log(e));
    });
});

router.delete("/", (req, res) => {
  Email.deleteMany().then(res.send({ message: "done" }));
});

module.exports = router;
