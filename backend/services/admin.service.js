const AdminModel = require("../models/admin.model");

module.exports.createAdmin = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await AdminModel.hashPassword(password);

  const admin = await AdminModel.create({
    fullname: { firstname, lastname },
    email,
    password: hashedPassword,
  });

  return admin;
};
