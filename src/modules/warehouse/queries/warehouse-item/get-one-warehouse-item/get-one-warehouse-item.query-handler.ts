import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetOneWarehouseItemDaoModel,
  GetOneWarehouseItemReadDao,
} from '@modules/warehouse/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetOneWarehouseItemQuery } from './get-one-warehouse-item.query';

@QueryHandler(GetOneWarehouseItemQuery)
export class GetOneWarehouseItemQueryHandler {
  constructor(private readonly readDao: GetOneWarehouseItemReadDao) {}

  async execute(
    query: GetOneWarehouseItemQuery,
  ): Promise<Result<GetOneWarehouseItemDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
