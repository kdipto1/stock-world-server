import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import httpStatus from "http-status";
import config from "../config/config";
import { logger } from "../logger";
import ApiError from "./ApiError";

export const errorConverter = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      (error as ApiError).statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message: string = error.message || `${httpStatus[statusCode]}`;
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err: ApiError, _req: Request, res: Response) => {
  let { statusCode, message } = err;
  if (config.nodeEnv === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "Internal Server Error";
  }

  res.locals["errorMessage"] = err.message;

  // Handle validation errors from Zod
  const errors = (err as any).validationErrors || [{
    field: err.name || 'error',
    message: message
  }];

  const response = {
    success: false,
    message,
    errors,
    ...(config.nodeEnv === "development" && { 
      stack: err.stack,
      statusCode 
    }),
  };

  if (config.nodeEnv === "development") {
    logger.error(err);
  }

  res.status(statusCode).json(response);
};
