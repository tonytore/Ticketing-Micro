import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema } from "joi";
import { errorResponse } from "../utils/helper/response-helper";

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: Record<string, string[]> = {};

    const { error, value } = schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      },
      { abortEarly: false, allowUnknown: true },
    );

    if (error) {
      error.details.forEach((err) => {
        // Normalize field path: strip the first segment (body/params/query/headers)
        const field =
          err.path.length > 1
            ? String(err.path.slice(1).join("."))
            : String(err.path[0] || "unknown");

        if (!errors[field]) errors[field] = [];

        // Push translated message
        errors[field].push(err.message);
      });

      errorResponse(
        req,
        res,
        "error.validationFailed",
        errors,
        StatusCodes.BAD_REQUEST,
      );
      return;
    }

    const updateRequestProperty = (
      key: "body" | "params" | "query",
      data: Record<string, unknown>,
    ) => {
      if (!data) return;

      try {
        (req as Request)[key] = data;
      } catch {
        Object.defineProperty(req, key, {
          value: data,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
    };

    updateRequestProperty("body", value.body);
    updateRequestProperty("params", value.params);
    updateRequestProperty("query", value.query);

    next();
  };
};
