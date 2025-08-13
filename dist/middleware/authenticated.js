"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const config_1 = __importDefault(require("../config"));
const authenticatedMiddleware = (req, res, next) => {
    // const token = req.cookies.authToken;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        throw new errors_1.Unauthenticated("Authentication Invalid");
    try {
        const { user } = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.user = user;
        next();
    }
    catch (err) {
        throw new errors_1.Unauthenticated("Authentication Invalid");
    }
};
exports.default = authenticatedMiddleware;
// deal with bookmarking
// book chapters that were deployed outside of your backend etc
//# sourceMappingURL=authenticated.js.map