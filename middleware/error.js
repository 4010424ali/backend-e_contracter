const ErrorResponse = require('../utils/errorResponse');

const errorHandle = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 1100) {
    const message = 'Duplicate field value enter';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose validator error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandle;
