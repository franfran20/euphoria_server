"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    writer: { type: String, required: true },
    description: String,
    coverImage: String,
    genres: {
        type: [String],
        required: true,
    },
});
const Book = (0, mongoose_1.model)("Book", BookSchema);
exports.default = Book;
//# sourceMappingURL=book.model.js.map