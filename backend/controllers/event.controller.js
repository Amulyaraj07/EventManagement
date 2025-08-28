const EventModel = require("../models/event.model");
const eventService = require("../services/event.service");
const { validationResult } = require("express-validator");


module.exports.createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, date, location } = req.body;

    const event = await eventService.createEvent({
      title,
      description,
      date,
      location,
      createdBy: req.organizer._id,
    });

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};


module.exports.updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedEvent = await eventService.updateEvent(id, req.body);
    res.status(200).json(updatedEvent);
  } catch (err) {
    next(err);
  }
};


module.exports.deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    await eventService.deleteEvent(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};


module.exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};


module.exports.getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(id);
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};
