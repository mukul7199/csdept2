var mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  title: { type: String, trim: true, required: true, unique: true },
  body: { type: String, trim: true, required: true },
  image: { type: String }
});

const Event = new mongoose.model("Event", EventSchema);

module.exports = Event;
