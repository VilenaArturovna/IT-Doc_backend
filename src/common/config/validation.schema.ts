import * as Joi from 'joi';

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

  //TELEGRAM
  TG_BOT_TOKEN: Joi.string().required(),
  TG_BOT_NAME: Joi.string().required(),

  MARGIN: Joi.number().required(),
  DOMAIN: Joi.string().required(),
  ADMIN_TG_ID: Joi.string().required(),
  MINUTES_BEFORE_DEADLINE: Joi.number().required(),

  //TIMEWEB
  TIMEWEB_ENDPOINT: Joi.string().required(),
  TIMEWEB_ACCESS_KEY_ID: Joi.string().required(),
  TIMEWEB_SECRET_ACCESS_KEY: Joi.string().required(),
  TIMEWEB_REGION: Joi.string().required(),
  TIMEWEB_PUBLIC_BUCKET: Joi.string().required(),
});
