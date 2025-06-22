import { Model, Types } from "mongoose";
import { IBook } from "./bookInterface";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface borrowStaticMethod extends Model<IBorrow> {
  updateAvailability(body: IBorrow, bookData: IBook): Promise<IBook>;
}
