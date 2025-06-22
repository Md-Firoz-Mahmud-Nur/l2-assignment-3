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

bookRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query;
    const filter = query.filter ? { genre: query.filter } : {};
    console.log(filter);
    const sortBy = query.sortBy as string;
    const sort = query.sort === "asc" ? 1 : -1;
    const limit = parseInt(query.limit as string) || 10;

    const books = await Book.find(filter)
      .sort({ [sortBy]: sort })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    next(error);
  }
});

bookRoutes.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;

      const books = await Book.findById(bookId);

      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: books,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

bookRoutes.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const body = req.body;
      console.log(body);

      const updatedBook = await Book.findByIdAndUpdate(bookId, body, {
        new: true,
        runValidators: true,
      });

      console.log(updatedBook);

      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

bookRoutes.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;

      const deletedBook = await Book.findByIdAndDelete(bookId);

      if (deletedBook === null) {
        res.status(404).json({
          success: false,
          message: "Book not found",
          data: null,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Book deleted successfully",
          data: null,
        });
      }
    } catch (error: any) {
      next(error);
    }
  }
);
