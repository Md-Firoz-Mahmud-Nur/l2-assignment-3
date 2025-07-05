import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/bookController";
import { borrowRoutes } from "./app/controllers/borrowControllers";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cors from "cors";

export const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://assignment-04-dusky.vercel.app",
    ],
  })
);

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to BookHive - Library Management API!");
});

export default app;
