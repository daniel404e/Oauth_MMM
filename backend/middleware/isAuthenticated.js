const { CLIENT_URL } = require("../constants");

/**
 * Authenticate middleware
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
exports.isAuthenticated = function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect(CLIENT_URL + "/login");
};
