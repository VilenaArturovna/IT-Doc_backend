import { Config, EnvironmentTypes } from './config.interface';

export const configuration = (): Config => ({
  app: {
    env: process.env.NODE_ENV as EnvironmentTypes,
    port: parseInt(process.env.PORT) || 3000,
  },
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  telegram: {
    token: process.env.TG_BOT_TOKEN,
    name: process.env.TG_BOT_NAME,
  },
  margin: parseInt(process.env.MARGIN),
  minutesBeforeDeadline: parseInt(process.env.MINUTES_BEFORE_DEADLINE),
  domain: process.env.DOMAIN,
  adminTgId: process.env.ADMIN_TG_ID,
});
