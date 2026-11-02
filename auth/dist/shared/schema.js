import Joi from "joi";
import { logger } from "../utils/logger/logger";
export const calculationModeValidator = Joi.string()
    .valid("SINGLE", "PHASED")
    .default("SINGLE")
    .optional();
export const idValidator = (field = "ID") => {
    logger.debug(field);
    return Joi.string().min(20).max(36).required().messages({
        "string.pattern.base": "validation.idFormat",
        "string.base": `validation.string`,
        "string.empty": `validation.notEmpty`,
        "string.required": `validation.required`,
    });
};
export const optionalIdValidator = (field = "ID") => {
    logger.debug(field);
    return Joi.string().min(20).max(36).allow(null, "").optional().messages({
        "string.pattern.base": "validation.idFormat",
        "string.base": `validation.string`,
        "string.empty": `validation.notEmpty`,
        "string.required": `validation.required`,
    });
};
/**
 * Normalizes email input to prevent Unicode encoding bypass attacks.
 * Applies NFKC normalization (converts fullwidth/lookalike chars to ASCII)
 * then rejects any remaining non-ASCII characters.
 */
const normalizeEmail = (value, helpers) => {
    const normalized = value.normalize("NFKC").toLowerCase().trim();
    if (/[^\x20-\x7E]/.test(normalized)) {
        return helpers.error("string.email");
    }
    return normalized;
};
export const emailValidator = () => {
    return Joi.string()
        .custom(normalizeEmail, "Unicode email normalization")
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        "string.email": `validation.email`,
        "string.base": `validation.string`,
        "string.empty": `validation.notEmpty`,
        "any.required": `validation.required`,
    });
};
export const optionalEmailValidator = () => {
    return Joi.string()
        .custom(normalizeEmail, "Unicode email normalization")
        .email({ tlds: { allow: false } })
        .optional()
        .allow(null, "")
        .messages({
        "string.email": `validation.email`,
        "string.base": `validation.string`,
        "string.empty": `validation.notEmpty`,
    });
};
export const dialCodeValidator = () => {
    return Joi.string()
        .pattern(/^\+\d{1,4}$/) // e.g., +251
        .required()
        .messages({
        "string.pattern.base": `validation.invalidDialCode`,
        "string.base": `validation.string`,
        "string.empty": `validation.notEmpty`,
        "string.required": `validation.required`,
    });
};
export const optionalDialCodeValidator = () => {
    return Joi.string()
        .pattern(/^\+\d{1,4}$/) // e.g., +251
        .optional()
        .allow(null, "")
        .messages({
        "string.pattern.base": `validation.invalidDialCode`,
        "string.base": `validation.string`,
    });
};
export const phoneNumberValidator = () => {
    return (Joi.string()
        // International phone numbers typically have 4 to 15 digits after the country code
        .pattern(/^\d{4,15}$/)
        .required()
        .messages({
        "string.pattern.base": `validation.phoneNumber`,
        "string.base": `validation.number`,
        "string.empty": `validation.notEmpty`,
        "string.required": `validation.required`,
    }));
};
export const optionalPhoneNumberValidator = () => {
    return Joi.string()
        .pattern(/^\d{4,15}$/)
        .optional()
        .allow(null, "")
        .messages({
        "string.pattern.base": `validation.phoneNumber`,
        "string.base": `validation.number`,
        "string.empty": `validation.notEmpty`,
    });
};
export const stringValidator = (min = 2, max = 500) => {
    return Joi.string().trim().min(min).max(max).required().messages({
        "string.base": `validation.string`,
        "any.required": `validation.required`,
        "string.min": `validation.min`,
        "string.max": `validation.max`,
    });
};
export const titleValidator = (min = 2, max = 100) => {
    return Joi.string().trim().min(min).max(max).required().messages({
        "string.base": `validation.string`,
        "any.required": `validation.required`,
        "string.min": `validation.min`,
        "string.max": `validation.max`,
    });
};
export const nullableTitleValidator = (min = 2, max = 100) => {
    return Joi.string()
        .trim()
        .min(min)
        .max(max)
        .allow(null, "")
        .optional()
        .messages({
        "string.base": `validation.string`,
        "string.min": `validation.min`,
        "string.max": `validation.max`,
    });
};
export const mapEmbedUrlValidator = (min = 10, max = 500) => {
    return Joi.string()
        .trim(false)
        .min(min)
        .max(max)
        .uri({ scheme: ["https"] }) // ✅ only allow https
        .allow(null, "")
        .optional()
        .messages({
        "string.base": "validation.string",
        "string.min": "validation.min",
        "string.max": "validation.max",
        "string.uri": "validation.invalidUrl",
    });
};
export const nullableStringValidator = (min = 2, max = 500) => {
    return Joi.string()
        .trim(false)
        .min(min)
        .max(max)
        .allow(null, "")
        .optional()
        .messages({
        "string.base": `validation.string`,
        "string.min": `validation.min`,
        "string.max": `validation.max`,
    });
};
export const fileValidator = () => {
    return Joi.any().optional().messages({
        "any.required": `validation.required`,
    });
};
export const jsonValidator = (field = "JSON") => Joi.alternatives()
    .try(Joi.object(), Joi.string().custom((value, helpers) => {
    // allow string that is valid JSON
    try {
        JSON.parse(value);
        return value;
    }
    catch {
        return helpers.error("any.invalid");
    }
}, "JSON string parse"))
    .messages({
    "any.invalid": `${field} must be a valid JSON object or JSON string`,
    "object.base": `${field} must be an object`,
    "string.base": `${field} must be a JSON string`,
});
export const booleanValidator = () => {
    return Joi.boolean().required().messages({
        "boolean.base": `validation.boolean`,
        "any.required": `validation.required`,
    });
};
export const nullableBooleanValidator = () => {
    return Joi.boolean().optional().messages({
        "boolean.base": `validation.boolean`,
    });
};
export const numberValidator = () => {
    return Joi.number().required().messages({
        "number.base": `validation.number`,
        "any.required": `validation.required`,
        "number.integer": `validation.integer`,
    });
};
export const nullableNumberValidator = () => {
    return Joi.number().allow(null, "").optional().messages({
        "number.base": `validation.number`,
        "any.required": `validation.required`,
        "number.integer": `validation.integer`,
    });
};
export const dateTimeValidator = () => {
    return Joi.date().required().iso().raw().messages({
        "date.base": `validation.date`,
        "any.required": `validation.required`,
        "date.iso": `validation.dateIso`,
    });
};
export const nullableDateTimeValidator = () => {
    return Joi.date().optional().iso().raw().messages({
        "date.base": `validation.date`,
        "any.required": `validation.required`,
        "date.iso": `validation.dateIso`,
    });
};
export const passwordValidator = (field = "Password") => {
    return Joi.string()
        .min(6)
        .max(20)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/)
        .required()
        .messages({
        "string.base": `${field} field must be a string`,
        "any.required": `${field} field is required`,
        "string.min": `${field} field must be at least 6 characters long`,
        "string.max": `${field} field must be at most 20 characters long`,
        "string.pattern.base": `${field} must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
    });
};
export const idParamValidator = () => {
    return Joi.object({
        body: Joi.object().length(0),
        params: Joi.object({
            id: idValidator(),
        }),
        query: Joi.object().length(0),
    });
};
export const urlValidator = () => {
    return Joi.string().uri().required().messages({
        "string.base": `validation.string`,
        "any.required": `validation.required`,
        "string.uri": `validation.url`,
    });
};
export const emailOrPhoneValidation = (label) => Joi.string()
    .trim()
    .required()
    .label(label)
    .custom((val, helpers) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    // Validates international phone numbers with optional '+' prefix (e.g. +251911234567 or 0911234567)
    const isPhone = /^\+?\d{6,15}$/.test(val);
    if (!isEmail && !isPhone) {
        return helpers.error("any.invalid");
    }
    return val;
}, "Email or phone validation")
    .messages({
    "any.invalid": `validation.phoneNumberOrEmail`,
});
export const jsonArrayOrString = Joi.alternatives().try(Joi.array().items(Joi.object({
    title: titleValidator(2, 100),
    description: jsonValidator(),
})), Joi.string().custom((value, helpers) => {
    let arr;
    try {
        arr = JSON.parse(value);
    }
    catch {
        return helpers.error("any.invalid");
    }
    if (!Array.isArray(arr)) {
        return helpers.error("any.invalid");
    }
    return arr;
}, "JSON-array parser"));
export const coordinateValidator = (fieldName) => Joi.number()
    .min(-180)
    .max(180)
    .required()
    .messages({
    "number.base": `validation.number`,
    "any.required": `validation.required`,
    "number.min": `${fieldName} must be at least -180`,
    "number.max": `${fieldName} must be at most 180`,
});
