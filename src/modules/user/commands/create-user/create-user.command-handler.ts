import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '@modules/user/commands/create-user/create-user.command';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserEntity } from '@modules/user/user.entity';
import { BcryptService } from '@lib/services/hash-password-service/bcrypt.service';
import { CryptoService } from '@lib/services/random-hash-service/crypto.service';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    private readonly repository: UserRepository,
    private readonly hashPasswordService: BcryptService,
    private readonly randomHashService: CryptoService,
  ) {}

  async execute(command: CreateUserCommand) {
    const user = new UserEntity();
    Object.assign(user, command.payload);
    user.inviteHash = await this.randomHashService.createHash();
    //TODO: send invite

    return await this.repository.save(user);
  }
}
