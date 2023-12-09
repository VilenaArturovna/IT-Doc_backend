import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetOneProviderDaoModel,
  GetOneProviderReadDao,
} from '@modules/warehouse/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetOneProviderQuery } from './get-one-provider.query';

@QueryHandler(GetOneProviderQuery)
export class GetOneProviderQueryHandler {
  constructor(private readonly readDao: GetOneProviderReadDao) {}

  async execute(
    query: GetOneProviderQuery,
  ): Promise<Result<GetOneProviderDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
