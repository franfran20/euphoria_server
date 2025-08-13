"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.route("/register").post(user_controller_1.registerWriter);
router.route("/subscribe").post(user_controller_1.subscribe);
router.route("/allocateTobook").post(user_controller_1.allocateToBook);
router.route("/mint").post(user_controller_1.mint);
exports.default = router;
//# sourceMappingURL=user.route.js.map