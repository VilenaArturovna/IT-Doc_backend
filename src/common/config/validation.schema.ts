import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  //APP
  NODE_ENV: Joi.string().valid('development', 'staging', 'production'),
  PORT: Joi.number().port(),

  //POSTGRES
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),

  //JWT
  JWT_SECRET: Joi.string().required(),
});
