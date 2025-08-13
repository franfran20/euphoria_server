"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChapterSchema = new mongoose_1.Schema({
    bookId: {
        type: String,
        required: true,
    },
    chapterId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
ChapterSchema.index({ bookId: 1, chapterId: 1 }, { unique: true });
const Chapter = (0, mongoose_1.model)("Chapter", ChapterSchema);
exports.default = Chapter;
//# sourceMappingURL=chapter.model.js.map