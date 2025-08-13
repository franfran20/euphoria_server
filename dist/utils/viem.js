"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeContractFunction = exports.publicClient = exports.relayerClient = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const config_1 = __importDefault(require("../config"));
const constants_1 = require("./constants");
const relayerAccount = (0, accounts_1.privateKeyToAccount)(config_1.default.relayerKey);
const relayerClient = (0, viem_1.createWalletClient)({
    chain: chains_1.morphHolesky,
    transport: (0, viem_1.http)(),
    account: relayerAccount,
});
exports.relayerClient = relayerClient;
const publicClient = (0, viem_1.createPublicClient)({
    chain: chains_1.morphHolesky,
    transport: (0, viem_1.http)(),
});
exports.publicClient = publicClient;
const executeContractFunction = async ({ functionName, args, }) => {
    const { request, result } = await publicClient.simulateContract({
        address: constants_1.EUPHORIA_FACTORY_ADDRESS,
        abi: constants_1.EUPHORIA_FACTORY_ABI,
        functionName,
        args,
    });
    // @ts-ignore
    const hash = await relayerClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({ hash });
    return result;
};
exports.executeContractFunction = executeContractFunction;
//# sourceMappingURL=viem.js.map