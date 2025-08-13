import { Schema, model } from "mongoose";

const BookSchema = new Schema({
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

const Book = model("Book", BookSchema);

export default Book;
