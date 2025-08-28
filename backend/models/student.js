const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters"],
    },
    lastname: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  course: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

studentSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: "student" }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

studentSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

studentSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Student", studentSchema);
