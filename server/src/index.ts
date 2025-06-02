import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.status(200).json({ key: "bye" });
});

app.listen(3000, () => {
  console.log("hello");
});
