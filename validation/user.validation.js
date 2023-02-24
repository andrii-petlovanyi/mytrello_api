import Joi from "joi";
import { emailRegexp } from "../helpers/regExp.js";

const loginSchema = Joi.object({
  password: Joi.string().min(8).max(32).required().messages({
    "any.required": "Password is required",
    "string.min": `Password length must be at least {{#limit}} characters long`,
    "string.max": `Password length must be at most {{#limit}} characters long`,
  }),
  email: Joi.string().min(6).max(62).required().pattern(emailRegexp).messages({
    "any.required": "Email is required",
    "string.min": `Email length must be at least {{#limit}} characters long`,
    "string.max": `Email length must be at most {{#limit}} characters long`,
    "string.pattern.base": "Email is must be in format email@domain.com",
  }),
});

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(32).required().messages({
    "any.required": "Name is required",
    "string.min": `Name length must be at least {{#limit}} characters long`,
    "string.max": `Name length must be at most {{#limit}} characters long`,
  }),
  password: Joi.string().min(8).max(32).required().messages({
    "any.required": "Password is required",
    "string.min": `Password length must be at least {{#limit}} characters long`,
    "string.max": `Password length must be at most {{#limit}} characters long`,
  }),
  email: Joi.string().min(6).max(62).required().pattern(emailRegexp).messages({
    "any.required": "Email is required",
    "string.min": `Email length must be at least {{#limit}} characters long`,
    "string.max": `Email length must be at most {{#limit}} characters long`,
    "string.pattern.base": "Email is must be in format email@domain.com",
  }),
});

export { loginSchema, registerSchema };
