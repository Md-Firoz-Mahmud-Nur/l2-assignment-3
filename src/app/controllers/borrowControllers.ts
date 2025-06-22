import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/bookModel";
import { Borrow } from "../models/borrowModel";

export const borrowRoutes = express.Router();

borrowRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const bookData = await Book.findById(body?.book);
      console.log("bookData", bookData);

      if (bookData === null) {
        res.status(404).json({
          success: false,
          message: `This book is not found`,
          data: null,
        });
      } else if (!bookData.available) {
        res.status(400).json({
          success: false,
          message: "Book is currently unavailable",
          data: null,
        });
      } else if (bookData.copies < body.quantity) {
        res.status(400).json({
          success: false,
          message: `Only ${bookData.copies} copy(s) available`,
          data: null,
        });
      } else if (bookData.copies >= body.quantity) {
        const updatedBook = await Borrow.updateAvailability(body, bookData);

        await updatedBook.save();

        const data = await Borrow.create(body);
        res.status(201).json({
          success: true,
          message: "Book borrowed successfully",
          data: data,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

borrowRoutes.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "book",
          },
        },
        {
          $unwind: "$book",
        },
        {
          $project: {
            totalQuantity: 1,
            book: {
              title: "$book.title",
              isbn: "$book.isbn",
            },
            _id: 0,
          },
        },
      ]);

      res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);
