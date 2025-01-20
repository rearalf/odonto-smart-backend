import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.string().default('dev'),
  JWT_SECRET: Joi.string(),
});
