import { CommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '@modules/user/commands/change-password/change-password.command';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { BcryptService } from '@lib/services/hash-password-service/bcrypt.service';
import { UserEntity } from '@modules/user/user.entity';
import { ConflictException } from '@nestjs/common';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler {
  constructor(
    private readonly repository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute(command: ChangePasswordCommand): Promise<UserEntity> {
    const user = await this.repository.findOneById(command.payload.id);

    const isValid = await this.bcryptService.compare(
      command.payload.password,
      user.password,
    );

    if (!isValid) {
      throw new ConflictException('Старый пароль не совпадает');
    }

    user.password = await this.bcryptService.hash(command.payload.newPassword);

    return await this.repository.save(user);
  }
}
