import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GetStaffQuery } from '@modules/staff/queries';
import { Role } from '@modules/staff/types';

export class GetStaffDaoModel {
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

  @ApiProperty()
  isRemoved: boolean;
}

export abstract class GetStaffReadDao extends ReadDaoBase<
  GetStaffDaoModel,
  GetStaffQuery
> {
  abstract query(
    query: GetStaffQuery,
  ): Promise<Result<GetStaffDaoModel, ExceptionBase>>;
}
