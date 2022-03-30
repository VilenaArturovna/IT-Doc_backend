import { CommandBase } from '@lib/base-classes/command.base';
import { UpdateUserRequestDto } from '@modules/user/commands/update-user/update-user.request.dto';

export class UpdateUserCommand extends CommandBase<
  UpdateUserRequestDto & { id: string }
> {}
