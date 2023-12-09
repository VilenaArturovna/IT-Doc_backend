import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils/result.util';
import { EmailVO, HashVO } from '@libs/value-objects';

import { MailPort } from './mail.port';
import { UserName } from './types';

export abstract class MailService implements MailPort {
  abstract passwordRecovery(
    resetPasswordHash: HashVO,
    name: UserName,
    email: EmailVO,
  ): Promise<Result<void, ExceptionBase>>;

  abstract sendPasswordToNewStaff(
    email: EmailVO,
    name: UserName,
    password: string,
  ): Promise<Result<void, ExceptionBase>>;
}
