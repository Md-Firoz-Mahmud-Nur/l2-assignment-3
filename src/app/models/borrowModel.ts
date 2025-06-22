import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/bookInterface";
import { borrowStaticMethod, IBorrow } from "../interfaces/borrowInterface";

const borrowSchema = new Schema<IBorrow, borrowStaticMethod>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

borrowSchema.static(
  "updateAvailability",
  async function (body: IBorrow, bookData: IBook) {
    bookData.copies -= body.quantity;
    if (bookData.copies <= 0) {
      bookData.available = false;
    }
    return bookData;
  }
);

export const Borrow = model<IBorrow, borrowStaticMethod>(
  "Borrow",
  borrowSchema
);
