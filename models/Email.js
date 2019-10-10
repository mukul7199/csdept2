var mongoose = require("mongoose");

const EmailSchema = mongoose.Schema({
  id: { type: String, unique: true, trim: true },
  isVerified: { type: Boolean, default: false }
});

const Email = new mongoose.model("Email", EmailSchema);

module.exports = Email;
