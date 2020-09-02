const ErrorResponse = require('./errorResponse');

exports.validateEmailFormat = (userEmail) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return new Promise((resolve, reject) => {
    if (emailRegEx.test(userEmail)) {
      resolve(true);
    }
    reject(new ErrorResponse('Invalid User Email', 400));
  });
};

exports.validatePasswordLength = (userPassword) => {
  return new Promise((resolve, reject) => {
    if (userPassword.length > 7) {
      resolve(true);
    }
    reject(new ErrorResponse('Password must at least 8 characters long', 400));
  });
};
