import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetManyWorksDaoModel,
  GetManyWorksReadDao,
} from '@modules/order/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetManyWorksQuery } from './get-many-works.query';

@QueryHandler(GetManyWorksQuery)
export class GetManyWorksQueryHandler {
  constructor(private readonly readDao: GetManyWorksReadDao) {}

  async execute(
    query: GetManyWorksQuery,
  ): Promise<Result<GetManyWorksDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
