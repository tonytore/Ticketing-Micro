import Joi from "joi";
import { idValidator, numberValidator, titleValidator } from "../shared/schema.js";
import { nullableIdValidator, nullableNumberValidator, nullableTitleValidator } from "../shared/schema.js";

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

export const getTicketSchema = Joi.object({
  body: Joi.object().length(0),
  params: Joi.object().length(0),
  query: Joi.object().length(0),
})

export const getSpecificTicketSchema = Joi.object({
  body: Joi.object({
    userId: nullableIdValidator("userId").required(),
    title: nullableTitleValidator(2, 100),
    price: nullableNumberValidator(),
  }),
  params: Joi.object({ id: idValidator("id").required() }).required(),
  query: Joi.object().length(0),
})
