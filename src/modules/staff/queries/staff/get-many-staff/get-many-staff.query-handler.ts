import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetManyStaffDaoModel,
  GetManyStaffReadDao,
} from '@modules/staff/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetManyStaffQuery } from './get-many-staff.query';

@QueryHandler(GetManyStaffQuery)
export class GetManyStaffQueryHandler {
  constructor(private readonly readDao: GetManyStaffReadDao) {}

  async execute(
    query: GetManyStaffQuery,
  ): Promise<Result<GetManyStaffDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
