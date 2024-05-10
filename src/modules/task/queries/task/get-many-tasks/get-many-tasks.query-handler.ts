import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetManyTasksDaoModel,
  GetManyTasksReadDao,
} from '@modules/task/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetManyTasksQuery } from './get-many-tasks.query';

@QueryHandler(GetManyTasksQuery)
export class GetManyTasksQueryHandler {
  constructor(private readonly readDao: GetManyTasksReadDao) {}

  async execute(
    query: GetManyTasksQuery,
  ): Promise<Result<GetManyTasksDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
