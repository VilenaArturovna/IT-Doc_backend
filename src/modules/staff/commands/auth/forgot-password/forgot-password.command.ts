import { CommandBase } from '@libs/base-classes';

import { ForgotPasswordRequestDto } from './forgot-password.request.dto';

export class ForgotPasswordCommand extends CommandBase<ForgotPasswordRequestDto> {}
