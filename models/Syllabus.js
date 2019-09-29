var mongoose = require("mongoose");

const SyllabusSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true, unique: true },
  file: { type: String, required: true }
  // date: { type: String },
});

const Syllabus = new mongoose.model("Syllabus", SyllabusSchema);

module.exports = Syllabus;
