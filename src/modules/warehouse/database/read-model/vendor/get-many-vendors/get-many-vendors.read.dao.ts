import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GetManyVendorsQuery } from '@modules/warehouse/queries';
import { PaginationResponseDto } from '@libs/pagination';

export class GetManyVendorsItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string;
}

export class GetManyVendorsDaoModel extends PaginationResponseDto<GetManyVendorsItem> {
  @ApiProperty({ type: () => GetManyVendorsItem, isArray: true })
  data: GetManyVendorsItem[];
}

export abstract class GetManyVendorsReadDao extends ReadDaoBase<
  GetManyVendorsDaoModel,
  GetManyVendorsQuery
> {
  abstract query(
    query: GetManyVendorsQuery,
  ): Promise<Result<GetManyVendorsDaoModel, ExceptionBase>>;
}
