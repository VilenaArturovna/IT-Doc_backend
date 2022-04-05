import { CommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from '@modules/user/commands/sign-in/sign-in.command';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { JwtServiceAdapter } from '@lib/services/jwt-service/jwt.service';
import { UserEntity } from '@modules/user/user.entity';

@CommandHandler(SignInCommand)
export class SignInCommandHandler {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtServiceAdapter,
  ) {}

  async execute(
    command: SignInCommand,
  ): Promise<UserEntity & { token: string }> {
    const { email } = command.payload;

    const user = await this.repository.findOneOrThrow({ email });

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { ...user, token };
  }
}
