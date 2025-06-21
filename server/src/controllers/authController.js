const authService = require("../services/authService");
const config = require("../config");

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken, projects } =
      await authService.login(req.body);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.app.env === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user, accessToken, projects });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const error = new Error("No active session to logout from");
      error.status = 400;
      throw error;
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: config.app.env === "production",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken, user, projects } = await authService.refresh(
      refreshToken
    );
    res.status(200).json({ accessToken, user, projects });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  logout,
  refresh,
};
