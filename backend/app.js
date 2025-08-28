const dotenv = require("dotenv");
dotenv.config();
const studentRoutes = require("./routes/student.routes");
const organiserRoutes = require("./routes/organizer.routes");
const adminRoutes = require("./routes/admin.routes");
const eventRoutes = require("./routes/event.routes");

const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");

const app = express();
connectToDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/students", studentRoutes);
app.use("/organisers", organiserRoutes);
app.use("/admins", adminRoutes);

app.get("/", (req, res) => {
  res.send("Event Management APP is running");
});

module.exports = app;
