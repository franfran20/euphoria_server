"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.logout = exports.verifySignature = exports.getNonce = void 0;
const http_status_codes_1 = require("http-status-codes");
const siwe_1 = require("siwe");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const getNonce = (req, res) => {
    const nonce = (0, siwe_1.generateNonce)();
    res.status(http_status_codes_1.StatusCodes.OK).json({ nonce });
};
exports.getNonce = getNonce;
const verifySignature = async (req, res) => {
    const { message, signature } = req.body;
    let siweMessage = new siwe_1.SiweMessage(message);
    const { success, error, data: signedMessage, } = await siweMessage.verify({ signature });
    // if (!success) {
    //   console.error(error);
    //   throw new BadRequestError("Invalid Signature");
    // }
    // const oneDay = 60 * 60 * 24 * 1000;
    const token = jsonwebtoken_1.default.sign({ user: signedMessage.address }, config_1.default.jwtSecret, {
        expiresIn: "1d",
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "Authentication successful",
        user: signedMessage.address,
        token,
    });
};
exports.verifySignature = verifySignature;
const logout = (req, res) => {
    res.clearCookie("authToken");
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "User logged out successfully" });
};
exports.logout = logout;
const checkAuth = (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=auth.controller.js.map