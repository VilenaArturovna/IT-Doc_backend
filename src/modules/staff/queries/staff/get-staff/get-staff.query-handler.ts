import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetManyStaffItem,
  GetStaffReadDao,
} from '@modules/staff/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetStaffQuery } from './get-staff.query';

@QueryHandler(GetStaffQuery)
export class GetStaffQueryHandler {
  constructor(private readonly readDao: GetStaffReadDao) {}

  async execute(
    query: GetStaffQuery,
  ): Promise<Result<GetManyStaffItem, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
