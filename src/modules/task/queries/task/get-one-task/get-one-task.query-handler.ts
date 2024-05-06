import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetOneTaskDaoModel,
  GetOneTaskReadDao,
} from '@modules/task/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetOneTaskQuery } from './get-one-task.query';

@QueryHandler(GetOneTaskQuery)
export class GetOneTaskQueryHandler {
  constructor(private readonly readDao: GetOneTaskReadDao) {}

  async execute(
    query: GetOneTaskQuery,
  ): Promise<Result<GetOneTaskDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
