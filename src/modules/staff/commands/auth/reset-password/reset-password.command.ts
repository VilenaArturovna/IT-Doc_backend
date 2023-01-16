import { CommandBase } from '@libs/base-classes';
import { ResetPasswordRequestDto } from './reset-password.request.dto';

export class ResetPasswordCommand extends CommandBase<ResetPasswordRequestDto> {}
