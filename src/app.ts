import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/bookController";
import { borrowRoutes } from "./app/controllers/borrowControllers";

export const app: Application = express();
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management app!");
});

export default app;
