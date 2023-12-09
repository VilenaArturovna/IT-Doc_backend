import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetOneWorkDaoModel,
  GetOneWorkReadDao,
} from '@modules/order/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetOneWorkQuery } from './get-one-work.query';

@QueryHandler(GetOneWorkQuery)
export class GetOneWorkQueryHandler {
  constructor(private readonly readDao: GetOneWorkReadDao) {}

  async execute(
    query: GetOneWorkQuery,
  ): Promise<Result<GetOneWorkDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
