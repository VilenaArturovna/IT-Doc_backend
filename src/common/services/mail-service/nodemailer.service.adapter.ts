import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { EmailVO, HashVO } from '@libs/value-objects';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { MailService } from './mail.service';
import {
  getPasswordRecoveryTemplate,
  getStaffCreatedTemplate,
} from './templates';
import { UserName } from './types';

export class NodemailerServiceAdapter extends MailService {
  private readonly transport;
  constructor(private readonly configService: ConfigService) {
    super();
    this.transport = nodemailer.createTransport({
      host: configService.get('smtp.host'),
      port: configService.get('smtp.port'),
      secure: true,
      auth: {
        user: configService.get('smtp.user'),
        pass: configService.get('smtp.pass'),
      },
    });
  }
  async passwordRecovery(
    resetPasswordHash: HashVO,
    name: UserName,
    email: EmailVO,
  ): Promise<Result<void, ExceptionBase>> {
    const contentValue = getPasswordRecoveryTemplate(
      resetPasswordHash.value,
      name,
      this.configService.get('site.resetPassword') +
        `?hash=${resetPasswordHash.value}`,
    );

    const message: Mail.Options = {
      to: email.value,
      subject: 'Сброс пароля',
      html: contentValue,
    };

    return this.sendMessage(message);
  }

  async sendPasswordToNewStaff(
    email: EmailVO,
    name: UserName,
    password: string,
  ): Promise<Result<void, ExceptionBase>> {
    const contentValue = getStaffCreatedTemplate(
      password,
      name,
      this.configService.get<string>('site.main'),
    );

    const message: Mail.Options = {
      to: email.value,
      subject: 'Создание учетной записи',
      html: contentValue,
    };

    return this.sendMessage(message);
  }

  private async sendMessage(
    mes: Mail.Options,
  ): Promise<Result<void, ExceptionBase>> {
    const message: Mail.Options = {
      ...mes,
      from: `"IT-Doc" <${this.configService.get('smtp.user')}>`,
    };

    try {
      await this.transport.sendMail(message);

      return Result.ok();
    } catch (error) {
      return Result.fail(new ConflictException(error.message));
    }
  }
}
