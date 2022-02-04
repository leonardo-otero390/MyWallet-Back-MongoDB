import joi from 'joi';

export const newRegister = joi.object({
  description: joi.string().required(),
  value: joi.number().required(),
});

export const register = joi.object({
  description: joi.string(),
  value: joi.number(),
});
