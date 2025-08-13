"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = require("../controllers/books.controller");
const router = (0, express_1.Router)();
router.route("/create").post(books_controller_1.createBook);
router.route("/random").get(books_controller_1.getRandomBook);
router.route("/:bookId/bookmark").post(books_controller_1.bookmark).get(books_controller_1.getBookmarks);
router.route("/:bookId/releaseChapter").post(books_controller_1.releaseChapter);
router.route("/:bookId/chapter/:chapterId").get(books_controller_1.getChapter);
router.route("/:bookId/vote").post(books_controller_1.voteBook);
router.route("/:bookId").get(books_controller_1.getBook);
exports.default = router;
//# sourceMappingURL=books.route.js.map