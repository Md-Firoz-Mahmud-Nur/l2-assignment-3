import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/bookModel";

export const bookRoutes = express.Router();

bookRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const book = await Book.create(body);

      res.status(200).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

bookRoutes.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await Book.find()
      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    } catch (error: any) {
      next(error);
    }
  }
);
