import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetManyClientsDaoModel,
  GetManyClientsReadDao,
} from '@modules/order/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetManyClientsQuery } from './get-many-clients.query';

@QueryHandler(GetManyClientsQuery)
export class GetManyClientsQueryHandler {
  constructor(private readonly readDao: GetManyClientsReadDao) {}

  async execute(
    query: GetManyClientsQuery,
  ): Promise<Result<GetManyClientsDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
