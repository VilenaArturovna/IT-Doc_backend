import { config as dotEnvConfig } from 'dotenv';
import type { Knex } from 'knex';

dotEnvConfig();

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  migrations: {
    directory: 'database/migrations',
    stub: 'database/migration.stub.ts',
  },
  seeds: {
    directory: 'database/seeds',
    stub: 'database/seed.stub.ts',
  },
};

export default {
  development: config,
  production: config,
  staging: config,
};
