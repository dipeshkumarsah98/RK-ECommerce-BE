import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../lib/errors.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      details: err.flatten(),
    });
    return;
  }

  if (err instanceof AppError) {
    if (!err.isOperational) {
      req.log.error({ err }, "Unexpected operational error");
    }
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  req.log.error({ err }, "Unhandled error");
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}
