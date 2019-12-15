import { IConfigEnv } from '../../interfaces/config.interfaces';

export class ConfigService {
  private readonly envConfig: IConfigEnv;

  constructor() {
    this.envConfig = {
      JWT_SECRET_KEY: 'gogo-github-nest',
      JWT_EXPIRES_IN: '600s',
      DEFAULT_PASSWORD: '123456',
    };
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
}
