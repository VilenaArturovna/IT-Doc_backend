import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { PaginationResponseDto } from '@libs/pagination';
import { Result } from '@libs/utils';
import { GetOneWarehouseItemDaoModel } from '@modules/warehouse/database/read-model';
import { GetManyWarehouseItemsQuery } from '@modules/warehouse/queries';
import { ApiProperty } from '@nestjs/swagger';

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
