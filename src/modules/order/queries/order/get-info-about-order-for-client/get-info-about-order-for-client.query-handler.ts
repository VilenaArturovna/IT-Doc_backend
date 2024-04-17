import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetInfoAboutOrderForClientDaoModel,
  GetInfoAboutOrderForClientReadDao,
} from '@modules/order/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetInfoAboutOrderForClientQuery } from './get-info-about-order-for-client.query';

@QueryHandler(GetInfoAboutOrderForClientQuery)
export class GetInfoAboutOrderForClientQueryHandler {
  constructor(private readonly readDao: GetInfoAboutOrderForClientReadDao) {}

  async execute(
    query: GetInfoAboutOrderForClientQuery,
  ): Promise<Result<GetInfoAboutOrderForClientDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
