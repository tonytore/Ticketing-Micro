import { logger } from "../logger/logger";
export const successResponse = (req, res, message, data, statusCode = 200, resource) => {
    return res
        .json({
        success: true,
        message,
        data,
    })
        .status(statusCode);
};
export const errorResponse = (req, res, message, error, statusCode = 400, resource) => {
    logger.error(error);
    return res.status(statusCode).json({
        success: false,
        message,
        error: error,
    });
};
