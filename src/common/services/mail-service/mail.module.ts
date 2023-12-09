import { Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { MailServiceProvider } from './mail.service.provider';

@Module({
  providers: [MailServiceProvider],
  exports: [MailService],
})
export class MailModule {}
