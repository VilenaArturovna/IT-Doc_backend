import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { PaginationResponseDto } from '@libs/pagination';
import { Result } from '@libs/utils';
import { GetManyStaffQuery } from '@modules/staff/queries';
import { Role } from '@modules/staff/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
