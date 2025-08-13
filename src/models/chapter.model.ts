import { Schema, model } from "mongoose";

const ChapterSchema = new Schema({
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

const Chapter = model("Chapter", ChapterSchema);

export default Chapter;
