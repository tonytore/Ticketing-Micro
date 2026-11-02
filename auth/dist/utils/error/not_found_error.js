import { NotFoundError } from "./custom_error_handler.js";
const notFoundHandler = (req, res, next) => {
    next(new NotFoundError("error.notFound", "notFoundHandler() Middleware", req.originalUrl));
};
export default notFoundHandler;
