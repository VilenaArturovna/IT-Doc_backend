import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetOneClientDaoModel,
  GetOneClientReadDao,
} from '@modules/order/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetOneClientQuery } from './get-one-client.query';

@QueryHandler(GetOneClientQuery)
export class GetOneClientQueryHandler {
  constructor(private readonly readDao: GetOneClientReadDao) {}

  async execute(
    query: GetOneClientQuery,
  ): Promise<Result<GetOneClientDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
