import { ForbiddenException } from '@libs/exceptions';
import { GetStaffReadDao } from '@modules/staff/database/read-model';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly staffReadDao: GetStaffReadDao,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const result = await this.staffReadDao.query({
      params: { id: payload.id },
    });

    if (result.isErr) {
      throw new ForbiddenException('Вы не авториизованы');
    }

    return result.unwrap();
  }
}
