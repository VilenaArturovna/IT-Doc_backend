import { CommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from '@modules/user/commands/reset-password/reset-password.command';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserEntity } from '@modules/user/user.entity';
import { BcryptService } from '@lib/services/hash-password-service/bcrypt.service';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler {
  constructor(
    private readonly repository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<UserEntity> {
    const user = await this.repository.findOneOrThrow({
      resetPasswordHash: command.payload.resetPasswordHash,
    });

    user.resetPasswordHash = null;

    user.password = await this.bcryptService.hash(command.payload.password);

    return await this.repository.save(user);
  }
}
