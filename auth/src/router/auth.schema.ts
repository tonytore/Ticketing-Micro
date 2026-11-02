import Joi from "joi";
import { emailValidator, passwordValidator } from "../shared/schema";

export const authListSchema = Joi.object({
  query: Joi.object().length(0),
  body: Joi.object().length(0),
});

export const loginSchema = Joi.object({
  params: Joi.object().length(0),
  body: Joi.object({
    email: emailValidator(),
    password: passwordValidator(),
  }),
  query: Joi.object().length(0),
});

export const signupSchema = Joi.object({
  params: Joi.object().length(0),
  body: Joi.object({
    email: emailValidator(),
    password: passwordValidator(),
  }),
  query: Joi.object().length(0),
});
