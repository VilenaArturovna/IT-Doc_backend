import { CommandBase } from '@lib/base-classes/command.base';
import { AcceptInviteRequestDto } from '@modules/user/commands/accept-invite/accept-invite.request.dto';

export class AcceptInviteCommand extends CommandBase<
  AcceptInviteRequestDto & { inviteHash: string }
> {}
