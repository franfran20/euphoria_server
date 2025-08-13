"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ConflictError = exports.ForbiddenError = exports.Unauthenticated = exports.BadRequestError = exports.CustomError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
// Other errors
class BadRequestError extends CustomError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.BadRequestError = BadRequestError;
class Unauthenticated extends CustomError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.Unauthenticated = Unauthenticated;
class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.FORBIDDEN);
    }
}
exports.ForbiddenError = ForbiddenError;
class ConflictError extends CustomError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.CONFLICT);
    }
}
exports.ConflictError = ConflictError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=index.js.map