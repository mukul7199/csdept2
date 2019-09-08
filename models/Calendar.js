var mongoose = require("mongoose");

const CalendarSchema = mongoose.Schema({
  title: { type: Number, trim: true, required: true, unique: true },
  image: { type: String, required: true },
  thumb: { type: String, required: true }
});

const Calendar = new mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;
