require("dotenv").config();
const config = {
  MongoDB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  SENDER_EMAIL_ID: process.env.SENDER_EMAIL_ID,
  SENDER_PASSWORD: process.env.SENDER_PASSWORD
};

module.exports = config;
