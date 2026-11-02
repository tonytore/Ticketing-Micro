import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { errorResponse, successResponse } from "../utils/helper/response-helper";
import appConfig from "../config/app_config";

interface UserPayload {
    id: string;
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const CurrentUser = (req: Request, res: Response, next: NextFunction)=>{
    if(!req.session?.jwt){
        return errorResponse(req, res, "error.auth", "You are not logged in", 401);
      }
  try {
    const payload = jwt.verify(req.session.jwt, appConfig.JWT_SECRET!) as UserPayload
    req.currentUser = payload;
    next();
  } catch (error) {
    return errorResponse(
      req,
      res,
      "error.auth",
      `Internal Server Error ${error}`,
      500,
    );
  }
}