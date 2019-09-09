var mongoose = require("mongoose");

const EmailSchema = mongoose.Schema({
  id: { type: String, trim: true, required: true, unique: true }
});

const Email = new mongoose.model("Email", EmailSchema);

module.exports = Email;
