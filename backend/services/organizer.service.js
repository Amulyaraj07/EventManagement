const OrganizerModel = require("../models/organizer.model");

module.exports.createOrganizer = async ({ firstname, lastname, email, password, department }) => {
  if (!firstname || !email || !password || !department) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await OrganizerModel.hashPassword(password);

  const organizer = await OrganizerModel.create({
    fullname: { firstname, lastname },
    email,
    password: hashedPassword,
    department,
  });

  return organizer;
};
