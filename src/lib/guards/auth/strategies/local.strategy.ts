import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BcryptService } from '@lib/services/hash-password-service/bcrypt.service';
import { UserRepository } from '@modules/user/repositories/user.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly repository: UserRepository,
    private readonly bcryptAdapter: BcryptService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.repository.findOne({
      email,
    });
    if (!user) return null;

    const isValid = await this.bcryptAdapter.compare(password, user.password);

    if (!isValid) throw new BadRequestException('Неверный пароль');

    return user;
  }
}
