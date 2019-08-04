var mongoose = require("mongoose");

const NewsSchema = mongoose.Schema({
  title: { type: String, trim: true, required: true, unique: true },
  body: { type: String, trim: true, default: null },
  date: { type: String, required: true },
  formattedDate: { type: String, required: true }
});

const News = new mongoose.model("News", NewsSchema);

module.exports = News;
