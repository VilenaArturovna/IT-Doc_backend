import { CommandBase } from '@lib/base-classes/command.base';
import { ChangePasswordRequestDto } from '@modules/user/commands/change-password/change-password.request.dto';

export class ChangePasswordCommand extends CommandBase<
  ChangePasswordRequestDto & { id: string }
> {}
