import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GetOneVendorQuery } from '@modules/warehouse/queries';

export class GetOneVendorDaoModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string;
}

export abstract class GetOneVendorReadDao extends ReadDaoBase<
  GetOneVendorDaoModel,
  GetOneVendorQuery
> {
  abstract query(
    query: GetOneVendorQuery,
  ): Promise<Result<GetOneVendorDaoModel, ExceptionBase>>;
}
