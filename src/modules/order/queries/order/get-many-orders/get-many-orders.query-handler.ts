import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetManyOrdersDaoModel,
  GetManyOrdersReadDao,
} from '@modules/order/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetManyOrdersQuery } from './get-many-orders.query';

@QueryHandler(GetManyOrdersQuery)
export class GetManyOrdersQueryHandler {
  constructor(private readonly readDao: GetManyOrdersReadDao) {}

  async execute(
    query: GetManyOrdersQuery,
  ): Promise<Result<GetManyOrdersDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
