const tokenUtils = require("../utils/generateToken");
const User = require("../models/User");
const config = require("../config");

const login = async ({ email, password }) => {
  const userExists = await User.findOne({ email: email }).select("+password");

  if (!userExists) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const passwordMatch = await User.comparePassword(password);

  if (!passwordMatch) {
    const error = new Error("Invalid password");
    error.status = 401;
    throw error;
  }

  const accessToken = tokenUtils.generateAccessToken(userExists._id);
  const refreshToken = tokenUtils.generateRefreshToken(userExists._id);

  return { user: userExists, accessToken, refreshToken };
};

const register = async ({ username, email, password, confirmPassword }) => {
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    const error = new Error("Email already registered");
    error.status = 409;
    throw error;
  }

  // validation for confirming password pending

  const user = await User.create({ name: username, email, password });
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
  return { accessToken, user };
};

module.exports = {
  login,
  register,
  refresh,
};
