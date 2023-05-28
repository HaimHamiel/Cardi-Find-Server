const { validationResult } = require("express-validator");

// // Middleware to handle validation errors
// const validateError = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // If there are validation errors, send an error response
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next(); // If no validation errors, proceed to the next middleware
// };
const validateError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => {
      const { param, value, msg } = error;
      // Log each validation error for debugging
      
      console.log(`Validation error for parameter '${param}': ${msg}. Value: ${value}.`);
      // Return an object with param, value, and msg fields for each error
      return { param, value, msg };
    });
    // Send a response to the client with all validation errors
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};


module.exports = validateError;