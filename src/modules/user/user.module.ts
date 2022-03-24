import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@modules/user/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserController } from '@modules/user/commands/create-user/create-user.controller';
import { CreateUserCommandHandler } from '@modules/user/commands/create-user/create-user.command-handler';
import { UserRepository } from '@modules/user/repositories/user.repository';

const httpControllers = [CreateUserController];
const commandHandlers = [CreateUserCommandHandler];
const queryHandlers = [];
const repositories = [UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...queryHandlers, ...repositories],
})
export class UserModule {}
