import { CommandBase } from '@lib/base-classes/command.base';
import { ResetPasswordRequestDto } from '@modules/user/commands/reset-password/reset-password.request.dto';

export class ResetPasswordCommand extends CommandBase<ResetPasswordRequestDto> {}
