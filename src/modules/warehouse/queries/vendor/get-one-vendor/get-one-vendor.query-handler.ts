import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  GetOneVendorDaoModel,
  GetOneVendorReadDao,
} from '@modules/warehouse/database/read-model';
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
