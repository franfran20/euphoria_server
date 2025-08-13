"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mint = exports.allocateToBook = exports.subscribe = exports.registerWriter = void 0;
const errors_1 = require("../errors");
const viem_1 = require("../utils/viem");
const http_status_codes_1 = require("http-status-codes");
const registerWriter = async (req, res) => {
    const { username, sig } = req.body;
    if (sig.user != req.user)
        throw new errors_1.ForbiddenError("Signature does not match authenticated user.");
    await (0, viem_1.executeContractFunction)({
        functionName: "registerWriterWithSig",
        args: [username, sig],
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "success" });
};
exports.registerWriter = registerWriter;
const subscribe = async (req, res) => {
    const { sig } = req.body;
    if (sig.user != req.user)
        throw new errors_1.ForbiddenError("Signature does not match authenticated user.");
    await (0, viem_1.executeContractFunction)({
        functionName: "subscribeWithSig",
        args: [sig],
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "success" });
};
exports.subscribe = subscribe;
const allocateToBook = async (req, res) => {
    const { bookId, amount, sig, } = req.body;
    if (sig.user != req.user)
        throw new errors_1.ForbiddenError("Signature does not match authenticated user.");
    await (0, viem_1.executeContractFunction)({
        functionName: "useSpendBackWithSig",
        args: [bookId, amount, sig],
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "success" });
};
exports.allocateToBook = allocateToBook;
const mint = async (req, res) => {
    const { recipient, amount } = req.body;
    await (0, viem_1.executeContractFunction)({
        functionName: "mintTokensIntoBalance",
        args: [amount, recipient],
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "success" });
};
exports.mint = mint;
//# sourceMappingURL=user.controller.js.map