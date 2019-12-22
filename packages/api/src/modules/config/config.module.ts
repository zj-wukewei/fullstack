import { Module, Global } from '@nestjs/common';

import { ConfigService } from './config.service';

const dev = process.env.NODE_ENV !== 'production';
const envFieldName = dev ? '.env' : '.env.production';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(envFieldName),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
