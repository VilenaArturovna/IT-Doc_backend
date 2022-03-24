import {CommandHandler} from "@nestjs/cqrs";
import {CreateUserCommand} from "@modules/user/commands/create-user/create-user.command";
import {UserRepository} from "@modules/user/repositories/user.repository";
import {UserEntity} from "@modules/user/user.entity";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const user = new UserEntity();
    Object.assign(user, command.payload);

    return await this.repository.save(user);
  }
}
