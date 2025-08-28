const express = require("express");
const router = express.Router();
const organiserController = require("../controllers/organizer.controller");
const { authOrganiser } = require("../middlewares/auth.middlewares");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("organization").notEmpty().withMessage("Organization is required"),
  ],
  organiserController.registerOrganiser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  organiserController.loginOrganiser
);

router.get("/profile", authOrganiser, organiserController.getOrganiserProfile);

router.post("/logout", authOrganiser, organiserController.logoutOrganiser);

module.exports = router;
