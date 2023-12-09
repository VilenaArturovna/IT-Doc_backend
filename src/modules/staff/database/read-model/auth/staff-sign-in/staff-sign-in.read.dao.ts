import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { StaffSignInQuery } from '@modules/staff/queries';
import { Role } from '@modules/staff/types';
import { ApiProperty } from '@nestjs/swagger';

export class StaffSignInDaoModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  password: string;
}

export abstract class StaffSignInReadDao extends ReadDaoBase<
  StaffSignInDaoModel,
  StaffSignInQuery
> {
  abstract query(
    query: StaffSignInQuery,
  ): Promise<Result<StaffSignInDaoModel, ExceptionBase>>;
}
