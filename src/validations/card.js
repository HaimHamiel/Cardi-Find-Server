const { check, body } = require("express-validator");
const validateError = require("./validate");

// Validation rules for create credit card
exports.cardValidationRules = [
  check("cardName").isString().isLength({ min: 3, max: 50 }).notEmpty(), // card name
  check("image").isString().isLength({ min: 5, max: 1000 }).notEmpty(), // image url
  check("details").isString().isLength({ min: 10, max: 500 }).notEmpty(), // details
  check("category").isString().isLength({ min: 3, max: 50 }).notEmpty(), // category
  validateError,
];
