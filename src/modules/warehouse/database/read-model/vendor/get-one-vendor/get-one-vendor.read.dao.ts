import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { GetOneVendorQuery } from '@modules/warehouse/queries';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
