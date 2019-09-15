const fs = require("fs");
const path = require("path");
const express = require("express");
const moment = require("moment");
const ShowcaseItem = require("../models/ShowcaseItem");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", (req, res) => {
  ShowcaseItem.find()
    .sort("priority")
    .then(items =>
      res.send({
        count: items.length,
        items: items
      })
    )
    .catch(e => console.log(e));
});

router.post("/", upload.single("image"), (req, res) => {
  const item = new ShowcaseItem({
    title: req.body.title,
    priority: req.body.priority,
    image: req.file.path
  });

  item
    .save()
    .then(item => {
      res.send(item);
    })
    .catch(e => console.log(e));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  ShowcaseItem.findById(id).then(item => {
    const image = item.image;
    const imagePath = path.join(__dirname + `/../${image}`);
    fs.unlinkSync(imagePath);
    ShowcaseItem.findByIdAndDelete(id)
      .then(item => {
        res.send(item);
      })
      .catch(e => console.log(e));
  });
});

// router.get("/", (req, res) => {
//   ShowcaseItem.find({
//     date: {
//       $lte: moment()
//         .subtract(5, "days")
//         .format("x")
//     }
//   })
//     .then(items => {
//       for (var i = 0; i < items.length; i++) {
//         var image = items[i].image;
//         var imagePath = path.join(__dirname + `/../${image}`);
//         fs.unlinkSync(imagePath);
//         ShowcaseItem.findByIdAndDelete(items[i]._id).then(deleted =>
//           console.log(deleted)
//         );
//       }
//     })
//     .then(() => {
//       ShowcaseItem.find().then(items =>
//         res.send({
//           count: items.length,
//           items: items
//         })
//       );
//     });
// });

// router.post("/", upload.single("image"), (req, res) => {
//   let date = moment(req.body.date, "DD-MM-YYYY").format("x");
//   const item = new ShowcaseItem({
//     title: req.body.title,
//     date: date,
//     image: req.file.path,
//     redirect: req.body.redirect
//   });
//   item
//     .save()
//     .then(item => res.send(item))
//     .catch(e => res.status(400).send(e));
// });

// router.delete("/", (req, res) => {
//   ShowcaseItem.find({
//     date: {
//       $lte: moment()
//         .subtract(5, "days")
//         .format("x")
//     }
//   })
//     .then(items => {
//       console.log(items);
//       for (var i = 0; i < items.length; i++) {
//         var image = items[i].image;
//         var imagePath = path.join(__dirname + `/../${image}`);
//         fs.unlinkSync(imagePath);
//         ShowcaseItem.findByIdAndDelete(items[i]._id).then(deleted =>
//           console.log(deleted)
//         );
//       }
//     })
//     .then(() => {
//       ShowcaseItem.find().then(items => res.send(items));
//     });
// });

module.exports = router;
