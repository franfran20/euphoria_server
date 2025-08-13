import { Router } from "express";
import {
  mint,
  registerWriter,
  subscribe,
  allocateToBook,
} from "../controllers/user.controller";

const router = Router();

router.route("/register").post(registerWriter);
router.route("/subscribe").post(subscribe);
router.route("/allocateTobook").post(allocateToBook);
router.route("/mint").post(mint);

export default router;
