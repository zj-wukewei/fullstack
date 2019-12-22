import { IConfigEnv } from '../../interfaces/config.interfaces';

const envalid = require('envalid');

export class ConfigService {
  private readonly envConfig: IConfigEnv;

  constructor(dotEnvPath: string) {
    this.envConfig = this.validate(dotEnvPath);
  }

  getJwtSecretKey(): string {
    return this.envConfig.JWT_SECRET_KEY;
  }
  getJwtEexpiresIn(): string {
    return this.envConfig.JWT_EXPIRES_IN;
  }

  getDefaultPassword(): string {
    return this.envConfig.DEFAULT_PASSWORD;
  }

  get DB_TYPE(): string {
    return this.envConfig.DB_TYPE;
  }

  get DB_HOST(): string {
    return this.envConfig.DB_HOST;
  }

  get DB_PORT(): number {
    return Number(this.envConfig.DB_PORT);
  }

  get DB_USER(): string {
    return this.envConfig.DB_USER;
  }

  get DB_PASSWORD(): string {
    return this.envConfig.DB_PASSWORD;
  }

  get DB_DATABASE(): string {
    return this.envConfig.DB_DATABASE;
  }

  get DB_SYNCHRONIZE(): boolean {
    return typeof this.envConfig.DB_SYNCHRONIZE !== 'undefined'
      ? Boolean(this.envConfig.DB_SYNCHRONIZE === 'true')
      : true;
  }

  private validate(dotEnvPath: string): IConfigEnv {
    const rule = {
      JWT_SECRET_KEY: envalid.str(),
      JWT_EXPIRES_IN: envalid.str(),
      DEFAULT_PASSWORD: envalid.str(),
      //
      DB_TYPE: envalid.str({ choices: ['mysql'], default: 'mysql' }),
      DB_HOST: envalid.str(),
      DB_PORT: envalid.num(),
      DB_USER: envalid.str(),
      DB_PASSWORD: envalid.str(),
      DB_DATABASE: envalid.str(),
      DB_SYNCHRONIZE: envalid.str(),
    };

    return envalid.cleanEnv(process.env, rule, { dotEnvPath });
  }
}
