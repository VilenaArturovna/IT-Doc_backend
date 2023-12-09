import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { PaginationResponseDto } from '@libs/pagination';
import { Result } from '@libs/utils';
import { GetManyVendorsQuery } from '@modules/warehouse/queries';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
