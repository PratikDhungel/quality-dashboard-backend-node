const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  // Create copy of the error object and assign message and stack properties from the copied object
  let newErrorObj = { ...err };
  newErrorObj.message = err.message;
  newErrorObj.stack = err.stack;

  // Log error for dev
  if (process.env.NODE_ENV === 'development') {
    console.log(newErrorObj.stack.red);
  }

  // Handle SQL Parse error
  if (newErrorObj.code === 'ER_PARSE_ERROR') {
    const message = `Error while parsing SQL Syntax`;
    newErrorObj = new ErrorResponse(message, 500);
  }

  // Return response after with error message and status
  console.log(`Returning response from error handler`.blue);
  res.status(newErrorObj.statusCode || 500).json({
    success: false,
    error: newErrorObj.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
