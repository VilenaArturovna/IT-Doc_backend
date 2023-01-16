import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  GetOneWarehouseItemDaoModel,
  GetOneWarehouseItemReadDao,
} from '@modules/warehouse/database/read-model';
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
