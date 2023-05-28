const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV,
  dbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsBucket: process.env.AWS_S3_BUCKET,
  awsRegion: process.env.AWS_REGION,
};


