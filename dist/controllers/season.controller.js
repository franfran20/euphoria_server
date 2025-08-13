"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNewSeason = exports.pullEarnings = void 0;
const viem_1 = require("../utils/viem");
const http_status_codes_1 = require("http-status-codes");
const pullEarnings = async (req, res) => {
    const { bookId, seasonId } = req.body;
    await (0, viem_1.executeContractFunction)({
        functionName: "pullSeasonsEarnings",
        args: [bookId, seasonId],
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Pulled Earnings", success: true });
};
exports.pullEarnings = pullEarnings;
const startNewSeason = async (req, res) => {
    await (0, viem_1.executeContractFunction)({
        functionName: "startNewSeason",
        args: [],
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "New Season Started", sucess: true });
};
exports.startNewSeason = startNewSeason;
//# sourceMappingURL=season.controller.js.map