const EventModel = require("../models/event.model");

module.exports.createEvent = async ({
  title,
  description,
  date,
  location,
  createdBy,
}) => {
  if (!title || !description || !date || !location || !createdBy) {
    throw new Error("All fields are required");
  }

  const event = await EventModel.create({
    title,
    description,
    date,
    location,
    createdBy,
    attendeeCount: 0,
  });

  return event;
};

module.exports.updateEvent = async (id, updateData) => {
  const event = await EventModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!event) throw new Error("Event not found");
  return event;
};

module.exports.deleteEvent = async (id) => {
  const event = await EventModel.findByIdAndDelete(id);
  if (!event) throw new Error("Event not found");
  return true;
};

module.exports.getAllEvents = async () => {
  return await EventModel.find().populate("createdBy", "fullname email");
};

module.exports.getEventById = async (id) => {
  const event = await EventModel.findById(id).populate(
    "createdBy",
    "fullname email"
  );
  if (!event) throw new Error("Event not found");
  return event;
};
