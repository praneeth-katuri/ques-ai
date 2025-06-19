const tokenUtils = require("../utils/generateToken");
const User = require("../models/User");
const config = require("../config");

const login = async ({ email, password }) => {
  const userExists = await User.findOne({ email }).select("+password");

  if (!userExists) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const passwordMatch = await userExists.comparePassword(password);

  if (!passwordMatch) {
    const error = new Error("Invalid password");
    error.status = 401;
    throw error;
  }

  const accessToken = tokenUtils.generateAccessToken(userExists._id);
  const refreshToken = tokenUtils.generateRefreshToken(userExists._id);

  return { user: userExists, accessToken, refreshToken };
};

const register = async ({ name, email, password, confirmPassword }) => {
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    const error = new Error("Email already registered");
    error.status = 409;
    throw error;
  }

  if (password !== confirmPassword) {
    const error = new Error("passwords don't match");
    error.status = 400;
    throw error;
  }

  const user = await User.create({ name, email, password });
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Token not found");
    error.status = 401;
    throw error;
  }

  const decoded = tokenUtils.verifyToken(
    refreshToken,
    config.jwt.refreshSecret
  );

  const userExists = await User.findById(decoded.id);

  if (!userExists) {
    const error = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }

  const accessToken = tokenUtils.generateAccessToken(userExists._id);
  return { accessToken, user: userExists };
};

module.exports = {
  login,
  register,
  refresh,
};
