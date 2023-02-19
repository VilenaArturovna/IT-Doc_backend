import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  GetOneClientDaoModel,
  GetOneClientReadDao,
} from '@modules/order/database/read-model';
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
