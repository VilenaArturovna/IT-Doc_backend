import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetManyWarehouseItemsDaoModel,
  GetManyWarehouseItemsReadDao,
} from '@modules/warehouse/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetManyWarehouseItemsQuery } from './get-many-warehouse-items.query';

@QueryHandler(GetManyWarehouseItemsQuery)
export class GetManyWarehouseItemsQueryHandler {
  constructor(private readonly readDao: GetManyWarehouseItemsReadDao) {}

  async execute(
    query: GetManyWarehouseItemsQuery,
  ): Promise<Result<GetManyWarehouseItemsDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
