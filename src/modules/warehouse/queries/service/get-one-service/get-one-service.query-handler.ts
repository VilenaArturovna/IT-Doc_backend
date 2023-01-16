import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  GetOneServiceDaoModel,
  GetOneServiceReadDao,
} from '@modules/warehouse/database/read-model';
import { GetOneServiceQuery } from './get-one-service.query';

@QueryHandler(GetOneServiceQuery)
export class GetOneServiceQueryHandler {
  constructor(private readonly readDao: GetOneServiceReadDao) {}

  async execute(
    query: GetOneServiceQuery,
  ): Promise<Result<GetOneServiceDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
