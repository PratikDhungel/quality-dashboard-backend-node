const ErrorResponse = require('./errorResponse');

exports.validateEmailFormat = (userEmail) => {
  console.log(`Inside validateEmailFormat`.blue);
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegEx.test(userEmail)) {
    return true;
  }
  console.log(`Invalid email format`.blue);
  return false;
};

exports.validatePasswordLength = (userPassword) => {
  if (userPassword.length > 7) {
    return true;
  }
  return new ErrorResponse('Password must at least 8 characters long', 400);
};
