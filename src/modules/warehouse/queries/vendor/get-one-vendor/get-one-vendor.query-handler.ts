import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetOneVendorDaoModel,
  GetOneVendorReadDao,
} from '@modules/warehouse/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetOneVendorQuery } from './get-one-vendor.query';

@QueryHandler(GetOneVendorQuery)
export class GetOneVendorQueryHandler {
  constructor(private readonly readDao: GetOneVendorReadDao) {}

  async execute(
    query: GetOneVendorQuery,
  ): Promise<Result<GetOneVendorDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
