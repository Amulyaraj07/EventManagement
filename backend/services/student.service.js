const StudentModel = require("../models/student.model");

module.exports.createStudent = async ({
  firstname,
  lastname,
  email,
  password,
  course,
  year,
}) => {
  if (!firstname || !email || !password || !course || !year) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await StudentModel.hashPassword(password);

  const student = await StudentModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password: hashedPassword,
    course,
    year,
  });

  return student;
};
