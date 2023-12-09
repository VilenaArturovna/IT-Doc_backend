import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils/result.util';
import { EmailVO, HashVO } from '@libs/value-objects';

import { UserName } from './types';

export interface MailPort {
  passwordRecovery(
    resetPasswordHash: HashVO,
    name: UserName,
    email: EmailVO,
  ): Promise<Result<void, ExceptionBase>>;
  sendPasswordToNewStaff(
    email: EmailVO,
    name: UserName,
    password: string,
  ): Promise<Result<void, ExceptionBase>>;
}
