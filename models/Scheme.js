var mongoose = require("mongoose");

const SchemeSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true, unique: true },
  file: { type: String, required: true }
  // date: { type: String },
});

const Scheme = new mongoose.model("SchemeSyllabus", SchemeSchema);

module.exports = Scheme;
