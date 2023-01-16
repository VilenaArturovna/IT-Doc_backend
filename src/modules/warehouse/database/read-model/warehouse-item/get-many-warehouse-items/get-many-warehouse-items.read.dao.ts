import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty } from '@nestjs/swagger';

import { GetManyWarehouseItemsQuery } from '@modules/warehouse/queries';
import { PaginationResponseDto } from '@libs/pagination';
import { GetOneWarehouseItemDaoModel } from '@modules/warehouse/database/read-model';

export class GetManyWarehouseItemsDaoModel extends PaginationResponseDto<GetOneWarehouseItemDaoModel> {
  @ApiProperty({ type: () => GetOneWarehouseItemDaoModel, isArray: true })
  data: GetOneWarehouseItemDaoModel[];
}

export abstract class GetManyWarehouseItemsReadDao extends ReadDaoBase<
  GetManyWarehouseItemsDaoModel,
  GetManyWarehouseItemsQuery
> {
  abstract query(
    query: GetManyWarehouseItemsQuery,
  ): Promise<Result<GetManyWarehouseItemsDaoModel, ExceptionBase>>;
}
