const AdminModel = require("../models/admin.model");
const adminService = require("../services/admin.service");
const { validationResult } = require("express-validator");

module.exports.registerAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await adminService.createAdmin({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
    });

    const token = admin.generateAuthToken();

    const safeAdmin = admin.toObject();
    delete safeAdmin.password;

    res.status(201).json({ token, admin: safeAdmin });
  } catch (err) {
    next(err);
  }
};

module.exports.loginAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = admin.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const safeAdmin = admin.toObject();
    delete safeAdmin.password;

    res.status(200).json({ token, admin: safeAdmin });
  } catch (err) {
    next(err);
  }
};

module.exports.getAdminProfile = async (req, res, next) => {
  res.status(200).json(req.admin);
};

module.exports.logoutAdmin = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logout successful" });
};
