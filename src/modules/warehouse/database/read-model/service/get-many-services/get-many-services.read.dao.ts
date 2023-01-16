import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GetManyServicesQuery } from '@modules/warehouse/queries';
import { PaginationResponseDto } from '@libs/pagination';

export class GetManyServicesItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string;

  @ApiProperty()
  cost: number;
}

export class GetManyServicesDaoModel extends PaginationResponseDto<GetManyServicesItem> {
  @ApiProperty({ type: () => GetManyServicesItem, isArray: true })
  data: GetManyServicesItem[];
}

export abstract class GetManyServicesReadDao extends ReadDaoBase<
  GetManyServicesDaoModel,
  GetManyServicesQuery
> {
  abstract query(
    query: GetManyServicesQuery,
  ): Promise<Result<GetManyServicesDaoModel, ExceptionBase>>;
}
