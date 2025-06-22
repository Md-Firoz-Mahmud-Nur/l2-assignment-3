import { Model, Types } from "mongoose";
import { IBookDocument } from "./bookInterface";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface borrowStaticMethod extends Model<IBorrow> {
  updateAvailability(body: IBorrow, bookData: IBookDocument): Promise<IBookDocument>;
}
