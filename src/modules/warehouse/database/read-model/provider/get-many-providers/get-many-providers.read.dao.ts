import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { PaginationResponseDto } from '@libs/pagination';
import { Result } from '@libs/utils';
import { GetManyProvidersQuery } from '@modules/warehouse/queries';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetManyProvidersItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string;
}

export class GetManyProvidersDaoModel extends PaginationResponseDto<GetManyProvidersItem> {
  @ApiProperty({ type: () => GetManyProvidersItem, isArray: true })
  data: GetManyProvidersItem[];
}

export abstract class GetManyProvidersReadDao extends ReadDaoBase<
  GetManyProvidersDaoModel,
  GetManyProvidersQuery
> {
  abstract query(
    query: GetManyProvidersQuery,
  ): Promise<Result<GetManyProvidersDaoModel, ExceptionBase>>;
}
