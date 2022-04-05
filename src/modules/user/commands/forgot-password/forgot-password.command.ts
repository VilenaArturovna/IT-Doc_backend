import { CommandBase } from '@lib/base-classes/command.base';
import { ForgotPasswordRequestDto } from '@modules/user/commands/forgot-password/forgot-password.request.dto';

export class ForgotPasswordCommand extends CommandBase<ForgotPasswordRequestDto> {}
