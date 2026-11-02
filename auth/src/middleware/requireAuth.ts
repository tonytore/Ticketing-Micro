import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../utils/error/custom_error_handler";

const RequireAuth = (req:Request, res:Response, next: NextFunction)=>{
    if(!req.currentUser){
        throw new UnauthenticatedError("Not authorized", "RequireAuth")
    }
    next();
}

export default RequireAuth;