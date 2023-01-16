import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  GetManyServicesDaoModel,
  GetManyServicesReadDao,
} from '@modules/warehouse/database/read-model';
import { GetManyServicesQuery } from './get-many-services.query';

@QueryHandler(GetManyServicesQuery)
export class GetManyServicesQueryHandler {
  constructor(private readonly readDao: GetManyServicesReadDao) {}

  async execute(
    query: GetManyServicesQuery,
  ): Promise<Result<GetManyServicesDaoModel, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
