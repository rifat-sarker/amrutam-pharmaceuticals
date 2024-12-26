import express, { Application, Request, Response } from "express";

const app: Application = express();

//parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Amrutam Pharmaceuticals");
});

export default app;
