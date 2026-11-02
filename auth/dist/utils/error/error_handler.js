import { StatusCodes } from "http-status-codes";
import { MulterError } from "multer";
import { logger } from "../logger/logger.js";
import { errorResponse } from "../helper/response-helper.js";
import { BadRequestError, CustomError } from "./custom_error_handler.js";
import { Prisma } from "../../generated/prisma/client.js";
const errorHandler = (err, req, res, _next) => {
    if (res.headersSent) {
        logger.error({ message: err.message, stack: err.stack, ip: req.ip });
        return;
    }
    if (err instanceof MulterError) {
        err = new BadRequestError(err.message, "error-handler.multer", {
            code: err.code,
            field: err.field,
        });
    }
    if (err instanceof CustomError) {
        const errorDetails = err.serializeErrors();
        const { stack, ...sanitizedErrorDetails } = errorDetails;
        logger.error({
            message: errorDetails.message,
            statusCode: errorDetails.statusCode,
            comingFrom: errorDetails.comingFrom,
            status: errorDetails.status,
            stack: err.stack,
            ip: req.ip,
            userAgent: req.get("User-Agent"),
            requestId: req.headers["x-request-id"] || "N/A",
        });
        errorResponse(req, res, errorDetails.message, {
            ...sanitizedErrorDetails,
            message: errorDetails.message,
        }, errorDetails.statusCode, errorDetails.metadata);
        return;
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(`${err}`);
        let errorMessage = "error.databaseErrorOccurred";
        let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        const comingFrom = "keyWords.database";
        switch (err.code) {
            case "P2025":
                errorMessage = "error.resourceNotFound";
                statusCode = StatusCodes.NOT_FOUND;
                break;
            case "P2002":
                errorMessage = "error.conflictWithExistingResource";
                statusCode = StatusCodes.BAD_REQUEST;
                break;
            case "P2003":
                errorMessage = "error.foreignKeyConstraintViolation";
                statusCode = StatusCodes.BAD_REQUEST;
                break;
            default:
                errorMessage = "error.databaseErrorOccurred";
                statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
                break;
        }
        logger.error({
            message: errorMessage,
            statusCode: statusCode,
            comingFrom: comingFrom,
            stack: err.stack,
            ip: req.ip,
            userAgent: req.get("User-Agent"),
            requestId: req.headers["x-request-id"] || "N/A",
        });
        errorResponse(req, res, errorMessage, err.meta, statusCode);
        return;
    }
    else {
        logger.error({
            message: err.message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            comingFrom: "Unknown",
            status: "error",
            stack: err.stack,
            ip: req.ip,
            userAgent: req.get("User-Agent"),
            requestId: req.headers["x-request-id"] || "N/A",
        });
        const { stack, ...sanitizedError } = err;
        errorResponse(req, res, "error.somethingWentWrong", sanitizedError, StatusCodes.INTERNAL_SERVER_ERROR);
        return;
    }
};
export default errorHandler;
