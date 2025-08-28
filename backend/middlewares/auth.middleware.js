const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.model");
const organiserModel = require("../models/organiser.model");
const adminModel = require("../models/admin.model");

const authenticate = (role) => {
  return async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorised Access" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let entity;
      switch (role) {
        case "student":
          entity = await studentModel.findById(decoded._id);
          req.student = entity;
          break;
        case "organiser":
          entity = await organiserModel.findById(decoded._id);
          req.organiser = entity;
          break;
        case "admin":
          entity = await adminModel.findById(decoded._id);
          req.admin = entity;
          break;
        default:
          return res.status(401).json({ message: "Invalid role" });
      }

      if (!entity) {
        return res.status(401).json({ message: "Unauthorised Access" });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorised Access" });
    }
  };
};

module.exports = {
  authStudent: authenticate("student"),
  authOrganiser: authenticate("organiser"),
  authAdmin: authenticate("admin"),
};
