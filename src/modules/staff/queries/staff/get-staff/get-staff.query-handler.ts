import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  GetManyStaffItem,
  GetStaffReadDao,
} from '@modules/staff/database/read-model';
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
