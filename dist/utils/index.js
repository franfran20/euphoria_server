"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatErrorName = void 0;
const formatErrorName = (errorMessage) => {
    return errorMessage
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
};
exports.formatErrorName = formatErrorName;
//# sourceMappingURL=index.js.map