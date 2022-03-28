import { CommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '@modules/user/commands/update-user/update-user.command';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserEntity } from '@modules/user/user.entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<UserEntity> {
    const user = await this.repository.findOneOrThrow({
      id: command.payload.id,
    });

    Object.assign(user, command.payload);
    return await this.repository.save(user);
  }
}
