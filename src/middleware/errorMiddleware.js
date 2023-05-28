const { env } = require("../config/vars");

const errorHandler = (err, req, res, next) => {
  try {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: env === "production" ? null : err.stack,
    });
  } catch (error) {
    console.error(`Error handling request: ${error}`);
    next(error);
  }
};

module.exports = { errorHandler };
