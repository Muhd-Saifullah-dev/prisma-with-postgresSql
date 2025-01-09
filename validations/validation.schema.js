const Joi = require("joi");

const validationSchema = Joi.object({
  name: Joi.string().required().min(4).max(120).messages({
    "string.base": "Name must be string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 4 character",
    "string.max": "Name maximum length is 120 character",
    "any.required": "Name is required",
  }),
  email: Joi.string().required().email().min(6).messages({
    "string.base": "email must be string",
    "string.empty": "email cannot be empty",
    "string.min": "email must be at least 6 character",
    "string.email": "email must be a valid email address ",
    "any.required": "email is required",
  }),
  password: Joi.string().required().min(8).alphanum().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have a minimum length of 8 characters",
    "any.required": "Password is required",
    "string.alphanum": "password contain any number",
  }),
});

const LoginvalidationSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "any.required": "email is required",
    "string.email": "email must be a valid email address",
  }),
  password: Joi.string().required().alphanum().messages({
    "any.required": "password is required",
  }),
});

const usernameSchema = Joi.object({
  name: Joi.string().required().min(4).max(100).messages({
    "string base": "Name must be string",
    "any.required": "Name is required",
    "string.min": "Name must  at least 4 character",
    "string.max": "Name maximum length is 100 character",
  }),
});

const changePasswordSchema = Joi.object({
  currentPassword:Joi.required().messages({
    "any.required":"current Password is required"
  }),
  newPassword: Joi.string().required().min(8).max(100).messages({
    "string.base": "newPassword must be string",
    "stirng.min": "newPassword at least contain 8 character",
    "string.max": "newPassword maximum length is 120 character",
    "any.required": "newPassword must be required",
  }),
  confirmPassword: Joi.valid(Joi.ref("newPassword")).required().messages({
    "any.required": "confirmPassword is required",
    "any.only": "confirm password must match newPassword",
  }),
});

module.exports = {
  validationSchema,
  LoginvalidationSchema,
  usernameSchema,
  changePasswordSchema,
};
