import { CommandBase } from '@libs/base-classes';
import { ChangePasswordRequestDto } from './change-password.request.dto';

export class ChangePasswordCommand extends CommandBase<
  ChangePasswordRequestDto & { id: string }
> {}
