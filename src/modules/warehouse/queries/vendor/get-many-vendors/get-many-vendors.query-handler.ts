import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  GetManyVendorsDaoModel,
  GetManyVendorsReadDao,
} from '@modules/warehouse/database/read-model';
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
