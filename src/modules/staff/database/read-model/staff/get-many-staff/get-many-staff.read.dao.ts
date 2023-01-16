import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GetManyStaffQuery } from '@modules/staff/queries';
import { PaginationResponseDto } from '@libs/pagination';
import { Role } from '@modules/staff/types';

export class GetManyStaffItem {
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

export class GetManyStaffDaoModel extends PaginationResponseDto<GetManyStaffItem> {
  @ApiProperty({ type: () => GetManyStaffItem, isArray: true })
  data: GetManyStaffItem[];
}

export abstract class GetManyStaffReadDao extends ReadDaoBase<
  GetManyStaffDaoModel,
  GetManyStaffQuery
> {
  abstract query(
    query: GetManyStaffQuery,
  ): Promise<Result<GetManyStaffDaoModel, ExceptionBase>>;
}
