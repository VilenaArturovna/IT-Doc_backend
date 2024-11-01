import { ConfigService } from '@nestjs/config';

import { S3Service } from './s3.service';

export const s3Provider = {
  provide: S3Service,
  useFactory: (configService: ConfigService) => new S3Service(configService),
  inject: [ConfigService],
};
