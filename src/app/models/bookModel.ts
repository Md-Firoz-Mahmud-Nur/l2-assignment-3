import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/bookInterface";
import { Borrow } from "./borrowModel";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Title field is required"] },
    author: { type: String, required: [true, "Author field is required"] },
    genre: {
      type: String,
      required: [true, "genre field is required"],
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: [true, "ISBN field is required"],
      unique: true,
    },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "Copies field is required"],
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.post("findOneAndDelete", async function (doc, next) {
  await Borrow.deleteMany({ book: doc._id });
  next();
});

export const Book = model("Book", bookSchema);
