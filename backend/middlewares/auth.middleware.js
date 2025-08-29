const jwt = require("jsonwebtoken");
const studentModel = require("../models/student");
const organizerModel = require("../models/organizer");
const adminModel = require("../models/admin");

const authenticate = (role) => {
  return async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorised Access.." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let entity;
      switch (role) {
        case "student":
          entity = await studentModel.findById(decoded._id);
          req.student = entity;
          break;
        case "organizer":
          entity = await organizerModel.findById(decoded._id);
          req.organizer = entity;
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
  authOrganizer: authenticate("organizer"),
  authAdmin: authenticate("admin"),
};
