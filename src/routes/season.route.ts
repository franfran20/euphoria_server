import { Router } from "express";
import { pullEarnings, startNewSeason } from "../controllers/season.controller";

const router = Router();

router.route("/pullEarnings").post(pullEarnings);
router.route("/start").post(startNewSeason);

export default router;
