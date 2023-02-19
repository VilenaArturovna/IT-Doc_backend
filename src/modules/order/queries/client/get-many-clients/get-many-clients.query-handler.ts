import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  GetManyClientsDaoModel,
  GetManyClientsReadDao,
} from '@modules/order/database/read-model';
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
