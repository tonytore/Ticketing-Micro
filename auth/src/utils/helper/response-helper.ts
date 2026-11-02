import type { Request, Response } from "express";
import { logger } from "../logger/logger";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export const successResponse = <T>(
  req: Request,
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200,
  resource?: string,
): Response => {
  return res
    .json({
      success: true,
      message,
      data,
    } as ApiResponse<T>)
    .status(statusCode);
};

export const errorResponse = (
  req: Request,
  res: Response,
  message: string,
  error?: unknown,
  statusCode: number = 400,
  resource?: string,
): Response => {
  logger.error(error);
  return res.status(statusCode).json({
    success: false,
    message,
    error: error,
  } as ApiResponse);
};
