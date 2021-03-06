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
import { SignInController } from '@modules/user/commands/sign-in/sign-in.controller';
import { SignInCommandHandler } from '@modules/user/commands/sign-in/sign-in.command-handler';
import { JwtServiceAdapter } from '@lib/services/jwt-service/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { AcceptInviteCommandHandler } from '@modules/user/commands/accept-invite/accept-invite.command-handler';
import { AcceptInviteController } from '@modules/user/commands/accept-invite/accept-invite.controller';
import { BcryptService } from '@lib/services/hash-password-service/bcrypt.service';
import { CryptoService } from '@lib/services/random-hash-service/crypto.service';
import { ForgotPasswordController } from '@modules/user/commands/forgot-password/forgot-password.controller';
import { ForgotPasswordCommandHandler } from '@modules/user/commands/forgot-password/forgot-password.command-handler';
import { ResetPasswordController } from '@modules/user/commands/reset-password/reset-password.controller';
import { ResetPasswordCommandHandler } from '@modules/user/commands/reset-password/reset-password.command-handler';
import { ChangePasswordCommandHandler } from '@modules/user/commands/change-password/change-password.command-handler';
import { ChangePasswordController } from '@modules/user/commands/change-password/change-password.controller';
import { LocalStrategy } from '@lib/guards/auth/strategies/local.strategy';
import { JwtStrategy } from '@lib/guards/auth/strategies/jwt.strategy';
import { GetMeController } from '@modules/user/queries/get-me/get-me.controller';
import { GetMeQueryHandler } from '@modules/user/queries/get-me/get-me.query-handler';

const httpControllers = [
  CreateUserController,
  DeleteUserController,
  GetManyUsersController,
  GetOneUserController,
  UpdateUserController,
  SignInController,
  AcceptInviteController,
  ForgotPasswordController,
  ResetPasswordController,
  ChangePasswordController,
  GetMeController,
];
const commandHandlers = [
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler,
  SignInCommandHandler,
  AcceptInviteCommandHandler,
  ForgotPasswordCommandHandler,
  ResetPasswordCommandHandler,
  ChangePasswordCommandHandler,
];
const queryHandlers = [
  GetManyUsersQueryHandler,
  GetOneUserQueryHandler,
  GetMeQueryHandler,
];
const repositories = [UserRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
    JwtModule.register({ secret: 'jwt-secret-word' }),
  ],
  controllers: [...httpControllers],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...repositories,
    JwtServiceAdapter,
    BcryptService,
    CryptoService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class UserModule {}
