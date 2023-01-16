import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  StaffSignInDaoModel,
  StaffSignInReadDao,
} from '@modules/staff/database/read-model';
import { StaffSignInQuery } from './staff-sign-in.query';
import { StaffSignInResponseDto } from '@modules/staff/queries/auth/staff-sign-in/staff-sign-in.response.dto';
import { JwtServiceAdapter } from '@src/common/services/jwt-service/jwt.service';
import { HashPasswordVO } from '@libs/value-objects';
import { ConflictException } from '@libs/exceptions';

@QueryHandler(StaffSignInQuery)
export class StaffSignInQueryHandler {
  constructor(
    private readonly readDao: StaffSignInReadDao,
    private readonly jwtService: JwtServiceAdapter,
  ) {}

  async execute(
    query: StaffSignInQuery,
  ): Promise<Result<StaffSignInResponseDto, ExceptionBase>> {
    const staffResult = await this.readDao.query(query);
    const staff: StaffSignInDaoModel = staffResult.unwrap();

    const isValid = await new HashPasswordVO(staff.password).compare(
      query.params.password,
    );

    if (!isValid) {
      return Result.fail(new ConflictException('Неверный логин или пароль'));
    }

    const token = this.jwtService.sign({ id: staff.id, role: staff.role });

    return Result.ok({ ...staff, token });
  }
}
