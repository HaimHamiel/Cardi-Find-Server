const { check } = require("express-validator");
const validateError = require("./validate");

// Validation rules for create business
exports.bussinessValidationRules = [
  // check("businessName").not().isEmpty(),
  // check("details").isLength({ min: 5 }),
  // check("location").not().isEmpty(),
  check("title").not().isEmpty(),
  check("description").isLength({ min: 5 }),
  check("address").not().isEmpty(),
  validateError,
];
