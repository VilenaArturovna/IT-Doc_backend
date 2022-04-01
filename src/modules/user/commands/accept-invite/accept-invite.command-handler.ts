import { CommandHandler } from '@nestjs/cqrs';
import { AcceptInviteCommand } from '@modules/user/commands/accept-invite/accept-invite.command';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserEntity } from '@modules/user/user.entity';
import { BcryptService } from '@lib/services/hash-password-service/bcrypt.service';

@CommandHandler(AcceptInviteCommand)
export class AcceptInviteCommandHandler {
  constructor(
    private readonly repository: UserRepository,
    private readonly hashPasswordService: BcryptService,
  ) {}

  async execute(command: AcceptInviteCommand): Promise<UserEntity> {
    const user = await this.repository.findOneOrThrow({
      inviteHash: command.payload.inviteHash,
    });
    Object.assign(user, command.payload);
    user.password = await this.hashPasswordService.hash(
      command.payload.password,
    );
    return await this.repository.save(user);
  }
}
