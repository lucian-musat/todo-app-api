export enum ErrorCodes {
  ServerError = "SERVER_ERROR",
  ReqValidationError = "REQ_VALIDATION_ERROR",
  EntityNotFound = "ENTITY_NOT_FOUND",
  WrongCredentials = "WRONG_CREDENTIALS",
  UnauthorizedRequest = "UNAUTHORIZED_REQUEST",
  DuplicatedUserEmail = "DUPLICATED_USER_EMAIL",
}

export enum ErrorDescriptions {
  ServerError = "Internal server error",
  ReqValidationError = "Invalid Request/Error in Request validation",
  EntityNotFound = "This entity is not found in the database",
  WrongCredentials = "Wrong credentials",
  UnauthorizedRequest = "Unauthorized request",
  DuplicatedUserEmail = "There is already a user with this email",
}
