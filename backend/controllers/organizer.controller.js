const OrganizerModel = require("../models/organizer.model");
const organizerService = require("../services/organizer.service");
const { validationResult } = require("express-validator");

module.exports.registerOrganizer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, department } = req.body;

    const existingOrganizer = await OrganizerModel.findOne({ email });
    if (existingOrganizer) {
      return res.status(400).json({ message: "Organizer already exists" });
    }

    const organizer = await organizerService.createOrganizer({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
      department,
    });

    const token = organizer.generateAuthToken();

    const safeOrganizer = organizer.toObject();
    delete safeOrganizer.password;

    res.status(201).json({ token, organizer: safeOrganizer });
  } catch (err) {
    next(err);
  }
};

module.exports.loginOrganizer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const organizer = await OrganizerModel.findOne({ email }).select("+password");
    if (!organizer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await organizer.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = organizer.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const safeOrganizer = organizer.toObject();
    delete safeOrganizer.password;

    res.status(200).json({ token, organizer: safeOrganizer });
  } catch (err) {
    next(err);
  }
};

module.exports.getOrganizerProfile = async (req, res, next) => {
  res.status(200).json(req.organizer);
};

module.exports.logoutOrganizer = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logout successful" });
};
