const AppError = require("../utils/AppError");

// Converts known library errors (Mongoose, JSON parsing) into AppErrors
const normalizeError = (err) => {
  if (err instanceof AppError) return err;

  // Invalid ObjectId, e.g. /job/edit/123
  if (err.name === "CastError") {
    return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // Mongoose schema validation failed
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    return new AppError(message, 400);
  }

  // Unique index violation, e.g. duplicate email
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return new AppError(`${field} already exists`, 409);
  }

  // Bad or expired JWT
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return new AppError("Invalid or expired token", 401);
  }

  // Malformed JSON body
  if (err.type === "entity.parse.failed") {
    return new AppError("Invalid JSON in request body", 400);
  }

  return null;
};

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const error = normalizeError(err);
  const statusCode = error ? error.statusCode : 500;
  const message = error ? error.message : "Internal server error";

  if (!error) console.error(err);

  const response = {
    success: false,
    code: statusCode,
    message,
  };

  if (process.env.DEV_MODE === "development") {
    response.error = err.message;
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };
