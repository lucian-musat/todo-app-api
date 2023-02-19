import express from "express";
import { AppError } from "../errors/app-error";
import { ErrorCodes, ErrorDescriptions } from "../errors/errors-codes";
import { ValidationError } from "yup";
import { JsonWebTokenError } from "jsonwebtoken";

export const errorsHandlerMiddleware = (
  err: AppError | ValidationError | JsonWebTokenError,
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
): express.ErrorRequestHandler => {
  console.log("New error description: ", err);

  if (err instanceof ValidationError) {
    response.status(400).json({
      errorCode: ErrorCodes.ReqValidationError,
      description: err.message,
    });
    return;
  }

  const error = {
    errorCode: err.errorCode,
    description: err.message,
  };

  const serverError = {
    errorCode: ErrorCodes.ServerError,
    description: ErrorDescriptions.ServerError,
  };

  switch (err.errorCode) {
    case ErrorCodes.EntityNotFound:
      response.status(412).json({ ...error });
      break;

    case ErrorCodes.UnauthorizedRequest:
      response.status(403).json({ ...error });
      break;

    case ErrorCodes.WrongCredentials:
      response.status(403).json({ ...error });
      break;

    case ErrorCodes.DuplicatedUserEmail:
      response.status(403).json({ ...error });
      break;

    default:
      response.status(500).json({ ...serverError });
      break;
  }
  next();
};

export const withInternalErrorHandler =
  (controllerFunction: (request, response, next) => void) =>
  (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    return Promise.resolve(controllerFunction(request, response, next)).catch(
      next
    );
  };
