"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const connectToDB = async () => {
    console.log("Connecting To DB...");
    await mongoose_1.default.connect(config_1.default.mongoURI);
};
exports.connectToDB = connectToDB;
//# sourceMappingURL=index.js.map