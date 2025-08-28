const RegistrationModel = require("../models/registration.model");
const registrationService = require("../services/registration.service");
const { validationResult } = require("express-validator");


module.exports.registerForEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { eventId } = req.body;

    const registration = await registrationService.registerForEvent(req.student._id, eventId);

    res.status(201).json(registration);
  } catch (err) {
    next(err);
  }
};


module.exports.cancelRegistration = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    await registrationService.cancelRegistration(req.student._id, eventId);

    res.status(200).json({ message: "Registration cancelled successfully" });
  } catch (err) {
    next(err);
  }
};


module.exports.updateRegistrationStatus = async (req, res, next) => {
  try {
    const { registrationId } = req.params;
    const { status } = req.body; 

    const registration = await registrationService.updateRegistrationStatus(registrationId, status);

    res.status(200).json(registration);
  } catch (err) {
    next(err);
  }
};


module.exports.getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await registrationService.getStudentRegistrations(req.student._id);
    res.status(200).json(registrations);
  } catch (err) {
    next(err);
  }
};


module.exports.getEventRegistrations = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const registrations = await registrationService.getEventRegistrations(eventId);
    res.status(200).json(registrations);
  } catch (err) {
    next(err);
  }
};
