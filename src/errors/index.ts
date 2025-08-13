import { StatusCodes } from "http-status-codes";
import { SiweError } from "siwe";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Other errors

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class Unauthenticated extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
