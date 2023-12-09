import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import {
  GetManyVendorsDaoModel,
  GetManyVendorsReadDao,
} from '@modules/warehouse/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';

import { GetManyVendorsQuery } from './get-many-vendors.query';

@QueryHandler(GetManyVendorsQuery)
export class GetManyVendorsQueryHandler {
  constructor(private readonly readDao: GetManyVendorsReadDao) {}

  async execute(
    query: GetManyVendorsQuery,
  ): Promise<Result<GetManyVendorsDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
