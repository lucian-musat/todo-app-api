import { ErrorCodes } from "./errors-codes";

export class AppError extends Error {
  errorCode: string;
  constructor(errorCode: ErrorCodes, message: string) {
    super(message);
    this.errorCode = errorCode;
  }

  toString(): string {
    return `ErrorCode: ${this.errorCode},
                Message: ${this.message},
                Name: ${this.name},
                Stack: ${this.stack}`;
  }
}

export interface IError {
  errorCode: string;
  errorDescription: string;
}
