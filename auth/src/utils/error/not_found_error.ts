import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "./custom_error_handler.js";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(
    new NotFoundError(
      "error.notFound",
      "notFoundHandler() Middleware",
      req.originalUrl,
    ),
  );
};

export default notFoundHandler;
