import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetManyProvidersDaoModel,
  GetManyProvidersReadDao,
} from '@modules/warehouse/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetManyProvidersQuery } from './get-many-providers.query';

@QueryHandler(GetManyProvidersQuery)
export class GetManyProvidersQueryHandler {
  constructor(private readonly readDao: GetManyProvidersReadDao) {}

  async execute(
    query: GetManyProvidersQuery,
  ): Promise<Result<GetManyProvidersDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
