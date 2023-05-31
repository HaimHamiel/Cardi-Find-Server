const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  protocol: "https",
  host: process.env.HOST,
  origin: '${process.env.HOST}:${process.env.PORT}',
};
