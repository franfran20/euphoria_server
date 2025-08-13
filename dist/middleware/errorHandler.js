"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const siwe_1 = require("siwe");
const errors_1 = require("../errors");
const viem_1 = require("viem");
const utils_1 = require("../utils");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    // SIWE error handling
    if (err instanceof siwe_1.SiweError)
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: err.type });
    // Custom error Handling
    if (err instanceof errors_1.CustomError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    // Viewm contract interaction error handling
    if (err instanceof viem_1.BaseError) {
        const revertError = err.walk((err) => err instanceof viem_1.ContractFunctionRevertedError);
        if (revertError instanceof viem_1.ContractFunctionRevertedError) {
            console.log(revertError);
            const errorMessage = (0, utils_1.formatErrorName)(revertError.data.errorName);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: errorMessage });
        }
    }
    res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong. Try again later." });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map