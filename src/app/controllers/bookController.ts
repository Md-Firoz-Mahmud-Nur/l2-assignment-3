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
    } catch (error: unknown) {
      next(error);
    }
  }
);

bookRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query;
    const filter = query.filter ? { genre: query.filter } : {};
    // const sortBy = query.sortBy as string;
    const sortBy = (req.query?.sortBy as string) || "createdAt";
    const sort = query.sort === "asc" ? 1 : -1;
    const limit = parseInt(query.limit as string) || 10;

    const books = await Book.find(filter)
      .sort({ [sortBy]: sort })
      .limit(limit);

    if (books.length === 0) {
      res.status(200).json({
        success: false,
        message: "No books found",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    }
  } catch (error: unknown) {
    next(error);
  }
});

bookRoutes.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;

      const books = await Book.findById(bookId);

      if (books === null) {
        res.status(404).json({
          success: false,
          message: "Book not found",
          data: null,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Book retrieved successfully",
          data: books,
        });
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

// bookRoutes.put(
//   "/:bookId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const bookId = req.params.bookId;
//       const body = req.body;

//       if (body.copies === 0) {
//         res.status(404).json({
//           success: false,
//           message: "Insert at least one copy",
//           data: null,
//         });
//       } else {
//         body.available = true;
//         const updatedBook = await Book.findByIdAndUpdate(bookId, body, {
//           new: true,
//           runValidators: true,
//         });

//         if (updatedBook === null) {
//           res.status(404).json({
//             success: false,
//             message: "Book not found",
//             data: null,
//           });
//         } else {
//           res.status(200).json({
//             success: true,
//             message: "Book updated successfully",
//             data: updatedBook,
//           });
//         }
//       }
//     } catch (error: unknown) {
//       next(error);
//     }
//   }
// );

bookRoutes.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;
      const body = req.body;

      if (body.copies === 0) {
        body.available = false;
      } else {
        body.available = true;
      }

      const updatedBook = await Book.findByIdAndUpdate(bookId, body, {
        new: true,
        runValidators: true,
      });

      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    } catch (error: unknown) {
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
    } catch (error: unknown) {
      next(error);
    }
  }
);
