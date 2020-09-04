const jwt = require('jsonwebtoken');

exports.generateJsonWebToken = (userID) => {
  // Generate and return a jwtToken with userID
  return jwt.sign({ userID: userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.generateCookieOptions = () => {
  // Generate and return a cookie with options expires and httpOnly
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Set secure to true for cookie when used in Production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  return options;
};
