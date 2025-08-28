const RegistrationModel = require("../models/registration.model");
const EventModel = require("../models/event.model");

module.exports.registerForEvent = async (studentId, eventId) => {

  const existing = await RegistrationModel.findOne({ student: studentId, event: eventId });
  if (existing) throw new Error("Already registered for this event");

  const registration = await RegistrationModel.create({ student: studentId, event: eventId });


  await EventModel.findByIdAndUpdate(eventId, { $inc: { attendeeCount: 1 } });

  return registration;
};

module.exports.cancelRegistration = async (studentId, eventId) => {
  const registration = await RegistrationModel.findOneAndDelete({ student: studentId, event: eventId });
  if (!registration) throw new Error("Registration not found");


  await EventModel.findByIdAndUpdate(eventId, { $inc: { attendeeCount: -1 } });
  return true;
};

module.exports.updateRegistrationStatus = async (registrationId, status) => {
  if (!["approved", "rejected"].includes(status)) throw new Error("Invalid status");

  const registration = await RegistrationModel.findByIdAndUpdate(registrationId, { status }, { new: true });
  if (!registration) throw new Error("Registration not found");

  return registration;
};

module.exports.getStudentRegistrations = async (studentId) => {
  return await RegistrationModel.find({ student: studentId })
    .populate("event", "title date location");
};

module.exports.getEventRegistrations = async (eventId) => {
  return await RegistrationModel.find({ event: eventId })
    .populate("student", "fullname email")
    .populate("event", "title date");
};
