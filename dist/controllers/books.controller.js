"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomBook = exports.voteBook = exports.getChapter = exports.getBookmarks = exports.bookmark = exports.releaseChapter = exports.getBook = exports.createBook = void 0;
const errors_1 = require("../errors");
const viem_1 = require("../utils/viem");
const book_model_1 = __importDefault(require("../models/book.model"));
const constants_1 = require("../utils/constants");
const http_status_codes_1 = require("http-status-codes");
const chapter_model_1 = __importDefault(require("../models/chapter.model"));
const bookmark_model_1 = __importDefault(require("../models/bookmark.model"));
const createBook = async (req, res) => {
    const { chapterLock, name, coverImageURI, genres, sig, description, } = req.body;
    console.log(req.body);
    if (sig.user != req.user)
        throw new errors_1.ForbiddenError("Signature does not match authenticated user.");
    console.log("111111");
    const bookId = await (0, viem_1.executeContractFunction)({
        functionName: "createEuphoriaBookWithSig",
        args: [chapterLock, name, coverImageURI, genres, sig],
    });
    console.log("22222");
    const [bookInfo, bookName, bookWriter, bookCoverImage] = (await viem_1.publicClient.readContract({
        address: constants_1.EUPHORIA_FACTORY_ADDRESS,
        abi: constants_1.EUPHORIA_FACTORY_ABI,
        functionName: "getBook",
        args: [bookId],
    }));
    console.log("333333");
    const book = await book_model_1.default.create({
        bookId: bookId.toString(),
        name: bookName,
        writer: bookWriter,
        description,
        coverImage: bookCoverImage,
        genres: bookInfo.genres.map((num) => num.toString()),
    });
    console.log("44444");
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ msg: "Created book succesfully", book });
};
exports.createBook = createBook;
const getBook = async (req, res) => {
    const { bookId } = req.params;
    const book = await book_model_1.default.findOne({ bookId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Fetched Book", success: true, book });
};
exports.getBook = getBook;
const releaseChapter = async (req, res) => {
    const { bookId } = req.params;
    const { title, finale, gatedURI, content, sig, } = req.body;
    console.log(bookId);
    console.log(req.body);
    if (sig.user != req.user)
        throw new errors_1.ForbiddenError("Signature does not match authenticated user.");
    const chapterId = await (0, viem_1.executeContractFunction)({
        functionName: "releaseChapterWithSig",
        args: [bookId, title, gatedURI, finale, sig],
    });
    const chapter = await chapter_model_1.default.create({
        bookId: bookId,
        chapterId: chapterId.toString(),
        content,
    });
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ msg: "Chapter Stored Successfully", chapter });
};
exports.releaseChapter = releaseChapter;
// modify for only one book mark function,, if bookmark exist delete and then send response that would be used in the client toast
const bookmark = async (req, res) => {
    const { bookId } = req.params;
    const bookmark = await bookmark_model_1.default.findOne({
        bookId: bookId,
        user: req.user,
    });
    if (bookmark) {
        await bookmark_model_1.default.deleteOne({ bookId: bookId, user: req.user });
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ msg: "Unbookmarked", success: true });
    }
    await bookmark_model_1.default.create({
        bookId: bookId,
        user: req.user,
    });
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ msg: "Bookmarked", success: true });
};
exports.bookmark = bookmark;
const getBookmarks = async (req, res) => {
    const { bookId } = req.params;
    const bookmarks = await bookmark_model_1.default.find({
        bookId: bookId,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "Fetched bookmarks",
        success: true,
        bookmarks: bookmarks.length,
    });
};
exports.getBookmarks = getBookmarks;
const getChapter = async (req, res) => {
    const { bookId, chapterId } = req.params;
    const hasAccess = (await viem_1.publicClient.readContract({
        address: constants_1.EUPHORIA_FACTORY_ADDRESS,
        abi: constants_1.EUPHORIA_FACTORY_ABI,
        functionName: "hasAccess",
        args: [bookId, req.user, chapterId],
    }));
    const chapter = await chapter_model_1.default.findOne({
        chapterId: chapterId,
        bookId: bookId,
    });
    if (!chapter)
        throw new errors_1.NotFoundError("Invalid chapter");
    if (hasAccess)
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ msg: "success", content: chapter.content });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "no access", content: "" });
};
exports.getChapter = getChapter;
const voteBook = async (req, res) => {
    const { bookId } = req.params;
    const { votes, sig } = req.body;
    if (sig.user != req.user)
        throw new errors_1.ForbiddenError("Signature does not match authenticated user.");
    await (0, viem_1.executeContractFunction)({
        functionName: "voteEuphoriaBookWithSig",
        args: [bookId, votes, sig],
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "success" });
};
exports.voteBook = voteBook;
const getRandomBook = async (req, res) => {
    const [randomBook] = await book_model_1.default.aggregate([
        {
            $match: {
                description: { $exists: true, $ne: "" },
            },
        },
        {
            $sample: { size: 1 },
        },
    ]);
    if (randomBook.length == 0)
        throw new errors_1.NotFoundError("No random book with description found");
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "Random book retrieved", book: randomBook });
};
exports.getRandomBook = getRandomBook;
//# sourceMappingURL=books.controller.js.map