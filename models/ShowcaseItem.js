var mongoose = require("mongoose");

const ShowcaseSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  priority: { type: Number, default: 3 },
  image: { type: String, required: true }
  // date: { type: String },
});

const ShowcaseItem = new mongoose.model("ShowcaseItem", ShowcaseSchema);

module.exports = ShowcaseItem;
