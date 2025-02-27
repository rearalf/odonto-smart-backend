import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.string().default('dev'),
  JWT_SECRET: Joi.string(),
  JWT_EXPIRESIN: Joi.string().default('1h'),
  JWT_EXPIRENSIN_REFRESH: Joi.string().default('1d'),
});
