import Joi from "joi";
import { idValidator, numberValidator, titleValidator } from "../shared/schema";
export const ticketCreateSchema = Joi.object({
    body: Joi.object({
        userId: idValidator("userId").required(),
        title: titleValidator(2, 100),
        price: numberValidator(),
    }),
    params: Joi.object().length(0),
    query: Joi.object().length(0),
});
export const ticketUpdateSchema = Joi.object({
    body: Joi.object({
        userId: idValidator("userId").required(),
        title: titleValidator(2, 100),
        price: numberValidator(),
    }),
    params: Joi.object({ id: idValidator("id").required() }).required(),
    query: Joi.object().length(0),
});
