export type EnvironmentTypes = 'development' | 'staging' | 'production';

export interface Config {
  app: {
    env: EnvironmentTypes;
    port: number;
  };
  database: {
    postgres: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
  };
  jwt: {
    secret: string;
  };
  telegram: {
    name: string;
    token: string;
  };
  margin: number;
  adminTgId: string;
  domain: string;
}
