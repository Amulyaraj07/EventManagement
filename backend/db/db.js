const mongoose = require("mongoose");

function connectToDb() {
  console.log(process.env.DB_CONNECT);
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error("DB connection error:", err));
}

module.exports = connectToDb;