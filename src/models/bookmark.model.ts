import { Schema, model } from "mongoose";

const BookmarkSchema = new Schema({
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

const Bookmark = model("Bookmark", BookmarkSchema);

export default Bookmark;
