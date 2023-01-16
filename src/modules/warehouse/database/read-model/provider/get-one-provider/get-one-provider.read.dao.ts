import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GetOneProviderQuery } from '@modules/warehouse/queries';

export class GetOneProviderDaoModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string;
}

export abstract class GetOneProviderReadDao extends ReadDaoBase<
  GetOneProviderDaoModel,
  GetOneProviderQuery
> {
  abstract query(
    query: GetOneProviderQuery,
  ): Promise<Result<GetOneProviderDaoModel, ExceptionBase>>;
}
