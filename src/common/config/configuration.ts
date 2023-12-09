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
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  site: {
    main: process.env.SITE_MAIN,
    resetPassword: process.env.SITE_RESET_PASSWORD,
  },
});
