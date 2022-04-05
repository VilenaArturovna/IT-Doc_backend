import { CommandHandler } from '@nestjs/cqrs';
import { ForgotPasswordCommand } from '@modules/user/commands/forgot-password/forgot-password.command';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { CryptoService } from '@lib/services/random-hash-service/crypto.service';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler {
  constructor(
    private readonly repository: UserRepository,
    private readonly randomHashService: CryptoService,
  ) {}

  async execute(command: ForgotPasswordCommand): Promise<boolean> {
    const user = await this.repository.findOneOrThrow({
      email: command.payload.email,
    });

    user.resetPasswordHash = await this.randomHashService.createHash();

    await this.repository.save(user);

    return true;
  }
}
