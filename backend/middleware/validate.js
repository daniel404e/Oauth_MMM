const { validationResult } = require("express-validator");
/**
 * Validator input middleware
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
const validate = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract error messages
    const errorMessages = errors
      .array()
      .map((error) => ({ field: error.fields, message: error.msg }));

    // Return a JSON response with error messages
    return res.status(400).json({ errors: errorMessages });
  }
  // If no validation errors, proceed to the next middleware
  next();
};

module.exports = validate;
