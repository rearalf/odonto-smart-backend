import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  PORT: Joi.number().default(3000),
  MYSELF_HOST: Joi.string().required().uri(),

  ALLOWED_ORIGINS: Joi.string()
    .required()
    .custom((value: string, helpers: Joi.CustomHelpers) => {
      if (value !== '*' && value !== '') {
        const urls = value.split(',').map((url) => url.trim());
        for (const url of urls) {
          const { error } = Joi.string()
            .pattern(/^https?:\/\/[a-zA-Z0-9.-]+(:[0-9]+)?(\/[a-zA-Z0-9/-]*)*$/) // El patrón es para URL
            .validate(url);
          if (error) {
            return helpers.error('any.invalid', {
              message: `Invalid URL: ${url}`,
            });
          }
        }
        return value;
      }
      return '*';
    }),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_TYPE: Joi.string()
    .valid('postgres', 'mysql', 'mariadb', 'sqlite', 'mssql')
    .required(),

  USER_EMAIL: Joi.string().required().email(),
  USER_PASSWORD: Joi.string().required().min(8),
});
