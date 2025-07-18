import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorResponse = {
    message: "Something went wrong!",
    success: false,
    error: {},
  };

  if (err instanceof mongoose.Error.ValidationError) {
    errorResponse.message = "Validation failed";
    errorResponse.error = {
      name: err.name,
      errors: err.errors,
    };
  } else {
    errorResponse.message = err.message || "Unknown error occurred";
    errorResponse.error = {
      name: err.name || "Error",
      ...err,
    };
  }
  res.status(400).json(errorResponse);
};

export default globalErrorHandler;
