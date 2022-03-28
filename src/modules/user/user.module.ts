import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@modules/user/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserController } from '@modules/user/commands/create-user/create-user.controller';
import { CreateUserCommandHandler } from '@modules/user/commands/create-user/create-user.command-handler';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { DeleteUserController } from '@modules/user/commands/delete-user/delete-user.controller';
import { DeleteUserCommandHandler } from '@modules/user/commands/delete-user/delete-user.command-handler';
import { GetManyUsersController } from '@modules/user/queries/get-many-users/get-many-users.controller';
import { GetManyUsersQueryHandler } from '@modules/user/queries/get-many-users/get-many-users.query-handler';
import { GetOneUserController } from '@modules/user/queries/get-one-user/get-one-user.controller';
import { GetOneUserQueryHandler } from '@modules/user/queries/get-one-user/get-one-user.query-handler';
import { UpdateUserCommandHandler } from '@modules/user/commands/update-user/update-user.command-handler';
import { UpdateUserController } from '@modules/user/commands/update-user/update-user.controller';

const httpControllers = [
  CreateUserController,
  DeleteUserController,
  GetManyUsersController,
  GetOneUserController,
  UpdateUserController,
];
const commandHandlers = [
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler,
];
const queryHandlers = [GetManyUsersQueryHandler, GetOneUserQueryHandler];
const repositories = [UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...queryHandlers, ...repositories],
})
export class UserModule {}
