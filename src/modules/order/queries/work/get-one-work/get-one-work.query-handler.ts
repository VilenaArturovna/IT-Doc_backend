import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  GetOneWorkDaoModel,
  GetOneWorkReadDao,
} from '@modules/order/database/read-model';
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
