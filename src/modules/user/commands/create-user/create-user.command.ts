import { CommandBase } from '@lib/base-classes/command.base';
import { CreateUserRequestDto } from '@modules/user/commands/create-user/create-user.request.dto';

export class CreateUserCommand extends CommandBase<CreateUserRequestDto> {}
