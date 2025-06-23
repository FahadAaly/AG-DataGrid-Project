import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};