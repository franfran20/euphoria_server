import { Router } from "express";
import {
  createBook,
  releaseChapter,
  getChapter,
  bookmark,
  getBookmarks,
  voteBook,
  getRandomBook,
  getBook,
} from "../controllers/books.controller";

const router = Router();

router.route("/create").post(createBook);

router.route("/random").get(getRandomBook);

router.route("/:bookId/bookmark").post(bookmark).get(getBookmarks);

router.route("/:bookId/releaseChapter").post(releaseChapter);
router.route("/:bookId/chapter/:chapterId").get(getChapter);

router.route("/:bookId/vote").post(voteBook);

router.route("/:bookId").get(getBook);

export default router;
