"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookmarkSchema = new mongoose_1.Schema({
    bookId: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
});
BookmarkSchema.index({ bookId: 1, user: 1 }, { unique: true });
const Bookmark = (0, mongoose_1.model)("Bookmark", BookmarkSchema);
exports.default = Bookmark;
//# sourceMappingURL=bookmark.model.js.map