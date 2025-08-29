const express = require("express");
const router = express.Router();
const organizerController = require("../controllers/organizer.controller");
const eventController = require("../controllers/event.controller");
const registrationController = require("../controllers/registration.controller");
const { authOrganizer } = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("department").notEmpty().withMessage("Department is required"),
  ],
  organizerController.registerOrganizer
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  organizerController.loginOrganizer
);

router.get("/profile", authOrganizer, organizerController.getOrganizerProfile);

router.post("/logout", authOrganizer, organizerController.logoutOrganizer);

router.get("/events", authOrganizer, eventController.getAllEvents);

router.get("/events/:id", authOrganizer, eventController.getEventById);

router.get(
  "/events/:eventId/registrations",
  authOrganizer,
  registrationController.getEventRegistrations
);

router.put(
  "/registrations/:registrationId",
  authOrganizer,
  registrationController.updateRegistrationStatus
);

module.exports = router;
