const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const config = require("./config");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors({ origin: config.app.frontendUrl, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// route to prevent render from shutting down
app.get("/api/ping", (req, res) => {
  res.status(200).send("pong");
});

// Global error handler
app.use(errorHandler);

module.exports = app;
