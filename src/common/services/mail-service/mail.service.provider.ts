import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MailPort } from './mail.port';
import { MailService } from './mail.service';
import { NodemailerServiceAdapter } from './nodemailer.service.adapter';

export const MailServiceProvider: Provider<MailPort> = {
  provide: MailService,
  useFactory: (configService: ConfigService) => {
    return new NodemailerServiceAdapter(configService);
  },
  inject: [ConfigService],
};
