const jwt = require('jsonwebtoken');

const generateJsonWebToken = (userID) => {
  return jwt.sign({ userID: userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = generateJsonWebToken;
