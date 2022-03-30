import { CommandBase } from '@lib/base-classes/command.base';
import { SignInRequestDto } from '@modules/user/commands/sign-in/sign-in.request.dto';

export class SignInCommand extends CommandBase<SignInRequestDto> {}
