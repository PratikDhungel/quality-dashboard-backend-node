const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const { returnSingleUserInfo } = require('../services/userServices');

// Protect Routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //   else if (req.cookies.token) {
  //     token = req.cookies.token;
  //   }

  if (!token) {
    return next(new ErrorResponse('Unauthorized to access this route', '401'));
  }

  try {
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

    const results = await returnSingleUserInfo(decodedToken.userID);
    req.userID = results.id;
    next();
  } catch (err) {
    return next(new ErrorResponse('Unauthorized to access this route', '401'));
  }
};
