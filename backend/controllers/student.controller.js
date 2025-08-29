const StudentModel = require("../models/student");
const studentService = require("../services/student.service");
const { validationResult } = require("express-validator");

module.exports.registerStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, course, year } = req.body;

    const isStudentAlreadyReg = await StudentModel.findOne({ email });
    if (isStudentAlreadyReg) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await studentService.createStudent({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
      course,
      year,
    });

    const token = student.generateAuthToken();

    res.status(201).json({ token, student });
  } catch (err) {
    next(err);
  }
};

module.exports.loginStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const student = await StudentModel.findOne({ email }).select("+password");
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = student.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, student });
  } catch (err) {
    next(err);
  }
};

module.exports.getStudentProfile = async (req, res, next) => {
  res.status(200).json(req.student);
};

module.exports.logoutStudent = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
