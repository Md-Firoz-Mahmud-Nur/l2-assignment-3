import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/bookInterface";
import { Borrow } from "./borrowModel";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "title field is required"] },
    author: { type: String, required: [true, "author field is required"] },
    genre: {
      type: String,
      required: [true, "genere field is required"],
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
      required: true,
      unique: true,
    },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "copies field is required"],
      min: [0, "Negative value not allow"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.post("findOneAndDelete", async function (doc, next) {
  const res = await Borrow.deleteMany({ book: doc._id });
  console.log(res);
  next();
});

export const Book = model("Book", bookSchema);
