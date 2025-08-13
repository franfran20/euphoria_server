import { Router } from "express";
import {
  getNonce,
  logout,
  verifySignature,
  checkAuth,
} from "../controllers/auth.controller";
import authenticated from "../middleware/authenticated";

// /api/v1/auth

const router = Router();

router.route("/getNonce").get(getNonce);
router.route("/verify").post(verifySignature);
router.route("/logout").post(authenticated, logout);
router.route("/checkAuth").get(authenticated, checkAuth);

export default router;
