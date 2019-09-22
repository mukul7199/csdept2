var mongoose = require("mongoose");

const EmailSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true }
});

const Email = new mongoose.model("Email", EmailSchema);

module.exports = Email;
