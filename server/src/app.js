const express = require("express");
const cors = require("cors");

const app = express();

// Built-in middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global error handler
app.use(errorHandler);

module.exports = app;
