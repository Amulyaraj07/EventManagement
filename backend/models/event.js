const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "Event title must be at least 3 characters"],
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizer",
    required: true,
  },
  attendeeCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Event", eventSchema);
