var mongoose = require("mongoose");

const ShowcaseSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  date: { type: String },
  redirect: { type: String, required: true }
});

const ShowcaseItem = new mongoose.model("ShowcaseItem", ShowcaseSchema);

module.exports = ShowcaseItem;
