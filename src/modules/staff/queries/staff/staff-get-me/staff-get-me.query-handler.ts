import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  StaffGetMeDaoModel,
  StaffGetMeReadDao,
} from '@modules/staff/database/read-model';
import { StaffGetMeQuery } from './staff-get-me.query';

@QueryHandler(StaffGetMeQuery)
export class StaffGetMeQueryHandler {
  constructor(private readonly readDao: StaffGetMeReadDao) {}

  async execute(
    query: StaffGetMeQuery,
  ): Promise<Result<StaffGetMeDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
