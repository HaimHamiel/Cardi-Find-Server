const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  protocol: "https",
  host: "localhost",
  origin: "https://localhost:5000",
};
