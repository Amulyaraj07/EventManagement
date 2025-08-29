const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const eventController = require("../controllers/event.controller");
const registrationController = require("../controllers/registration.controller");
const { authAdmin } = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  adminController.registerAdmin
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required.."),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  adminController.loginAdmin
);

router.get("/profile", authAdmin, adminController.getAdminProfile);

router.post("/logout", authAdmin, adminController.logoutAdmin);

router.post("/events", authAdmin, eventController.createEvent);

router.put("/events/:id", authAdmin, eventController.updateEvent);

router.delete("/events/:id", authAdmin, eventController.deleteEvent);

router.get("/events", authAdmin, eventController.getAllEvents);

router.get("/events/:id", authAdmin, eventController.getEventById);

router.get(
  "/events/:eventId/registrations",
  authAdmin,
  registrationController.getEventRegistrations
);

router.put(
  "/registrations/:registrationId",
  authAdmin,
  registrationController.updateRegistrationStatus
);

module.exports = router;
