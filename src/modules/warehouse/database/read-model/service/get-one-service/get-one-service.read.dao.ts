import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GetOneServiceQuery } from '@modules/warehouse/queries';

export class GetOneServiceDaoModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string;

  @ApiProperty()
  cost: number;
}

export abstract class GetOneServiceReadDao extends ReadDaoBase<
  GetOneServiceDaoModel,
  GetOneServiceQuery
> {
  abstract query(
    query: GetOneServiceQuery,
  ): Promise<Result<GetOneServiceDaoModel, ExceptionBase>>;
}
