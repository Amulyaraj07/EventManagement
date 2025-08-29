const express = require("express");
const router = express.Router();
const organizerController = require("../controllers/organizer.controller");
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

module.exports = router;
