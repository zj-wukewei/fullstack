export interface IConfigEnv {
  JWT_SECRET_KEY: string;
  JWT_EXPIRES_IN: string;
  DEFAULT_PASSWORD: string;

  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_SYNCHRONIZE: string;
}
