const { check } = require("express-validator");
const validateError = require("./validate");

// Validation rules for user registration
exports.registerValidationRules = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
    validateError,
];

// Validation rules for user login
exports.loginValidationRules = [
  check("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail(),
  check("password").notEmpty().withMessage("Password is required"),
  validateError,
];
