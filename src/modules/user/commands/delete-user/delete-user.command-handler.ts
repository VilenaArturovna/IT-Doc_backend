import { CommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '@modules/user/commands/delete-user/delete-user.command';
import { UserEntity } from '@modules/user/user.entity';
import { UserRepository } from '@modules/user/repositories/user.repository';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: DeleteUserCommand): Promise<UserEntity> {
    const entity = await this.repository.findOneOrThrow({
      id: command.payload.id,
    });

    return await this.repository.removeOne(entity);
  }
}
