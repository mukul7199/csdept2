var mongoose = require("mongoose");

const AchievementSchema = mongoose.Schema({
  title: { type: String, trim: true, required: true, unique: true },
  body: { type: String, trim: true, required: true },
  date: { type: String, required: true },
  formattedDate: { type: String, required: true },
  image: { type: String }
});

const Achievement = new mongoose.model("Achievement", AchievementSchema);

module.exports = Achievement;
