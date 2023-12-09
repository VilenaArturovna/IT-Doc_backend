import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { StaffGetMeQuery } from '@modules/staff/queries';
import { Role } from '@modules/staff/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StaffGetMeDaoModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role;

  @ApiPropertyOptional({ nullable: true })
  avatar?: string;

  @ApiPropertyOptional({ nullable: true })
  birthdate?: string;
}

export abstract class StaffGetMeReadDao extends ReadDaoBase<
  StaffGetMeDaoModel,
  StaffGetMeQuery
> {
  abstract query(
    query: StaffGetMeQuery,
  ): Promise<Result<StaffGetMeDaoModel, ExceptionBase>>;
}
