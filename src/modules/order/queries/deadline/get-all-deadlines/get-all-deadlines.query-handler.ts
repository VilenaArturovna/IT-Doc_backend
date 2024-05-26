import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetAllDeadlinesDaoModel,
  GetAllDeadlinesReadDao,
} from '@modules/order/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetAllDeadlinesQuery } from './get-all-deadlines.query';

@QueryHandler(GetAllDeadlinesQuery)
export class GetAllDeadlinesQueryHandler {
  constructor(private readonly readDao: GetAllDeadlinesReadDao) {}

  async execute(
    query: GetAllDeadlinesQuery,
  ): Promise<Result<GetAllDeadlinesDaoModel[], ExceptionBase>> {
    return this.readDao.query(query);
  }
}
