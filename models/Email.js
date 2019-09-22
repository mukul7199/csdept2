var mongoose = require("mongoose");

const EmailSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true }
  // validate: {
  //   validator: function(v, cb) {
  //     Email.find({ id: v }, function(err, docs) {
  //       cb(docs.length == 0);
  //     });
  //   },
  //   message: "User already exists!"
  // }
});

const Email = new mongoose.model("Email", EmailSchema);

module.exports = Email;
