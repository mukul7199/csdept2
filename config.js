require("dotenv").config();
const config = {
  MongoDB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT
};

module.exports = config;
