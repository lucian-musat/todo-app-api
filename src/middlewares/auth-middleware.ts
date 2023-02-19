import express from "express";
import * as jwt from "jsonwebtoken";
import { AppError } from "../errors/app-error";
import { ErrorCodes, ErrorDescriptions } from "../errors/errors-codes";

export const authMiddleware = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = request.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      response.locals.userId = verified.userId;
    } else {
      throw new AppError(
        ErrorCodes.UnauthorizedRequest,
        ErrorDescriptions.UnauthorizedRequest
      );
    }
  } catch (error) {
    throw new AppError(
      ErrorCodes.UnauthorizedRequest,
      ErrorDescriptions.UnauthorizedRequest
    );
  }
  next();
};
