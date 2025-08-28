const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { authAdmin } = require("../middlewares/auth.middlewares");
const { body } = require("express-validator");


router.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
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

module.exports = router;
