import { CommandBase } from '@lib/base-classes/command.base';
import { DeleteUserRequestDto } from '@modules/user/commands/delete-user/delete-user.request.dto';

export class DeleteUserCommand extends CommandBase<
  DeleteUserRequestDto & { id: string }
> {}
