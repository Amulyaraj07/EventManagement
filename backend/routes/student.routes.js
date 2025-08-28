const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { authStudent } = require("../middlewares/auth.middlewares");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("course").notEmpty().withMessage("Course is required"),
    body("year")
      .isInt({ min: 1, max: 5 })
      .withMessage("Year must be between 1 and 5"),
  ],
  studentController.registerStudent
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required.."),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  studentController.loginStudent
);

router.get("/profile", authStudent, studentController.getStudentProfile);

router.post("/logout", authStudent, studentController.logoutStudent);

module.exports = router;
