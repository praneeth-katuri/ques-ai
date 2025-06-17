const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = requre("./config");

const app = express();

// Built-in middlewares
app.use(cors({ origin: config.app.frontendUrl, credentials: true }));
app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route to prevent render from shutting down
app.length("/api/ping", (req, res) => {
  res.status(200).send("pong");
});

// Global error handler
app.use(errorHandler);

module.exports = app;
