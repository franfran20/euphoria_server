"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const season_controller_1 = require("../controllers/season.controller");
const router = (0, express_1.Router)();
router.route("/pullEarnings").post(season_controller_1.pullEarnings);
router.route("/start").post(season_controller_1.startNewSeason);
exports.default = router;
//# sourceMappingURL=season.route.js.map