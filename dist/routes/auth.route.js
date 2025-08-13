"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authenticated_1 = __importDefault(require("../middleware/authenticated"));
// /api/v1/auth
const router = (0, express_1.Router)();
router.route("/getNonce").get(auth_controller_1.getNonce);
router.route("/verify").post(auth_controller_1.verifySignature);
router.route("/logout").post(authenticated_1.default, auth_controller_1.logout);
router.route("/checkAuth").get(authenticated_1.default, auth_controller_1.checkAuth);
exports.default = router;
//# sourceMappingURL=auth.route.js.map