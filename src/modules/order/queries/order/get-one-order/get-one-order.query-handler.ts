import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetOneOrderDaoModel,
  GetOneOrderReadDao,
} from '@modules/order/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetOneOrderQuery } from './get-one-order.query';

@QueryHandler(GetOneOrderQuery)
export class GetOneOrderQueryHandler {
  constructor(private readonly readDao: GetOneOrderReadDao) {}

  async execute(
    query: GetOneOrderQuery,
  ): Promise<Result<GetOneOrderDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
