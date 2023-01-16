import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetOneServiceDaoModel,
  GetOneServiceReadDao,
} from './get-one-service.read.dao';
import { GetOneServiceQuery } from '@modules/warehouse/queries';
import { NotFoundException } from '@libs/exceptions';

export class GetOneServiceObjectionReadDao extends GetOneServiceReadDao {
  async query(
    query: GetOneServiceQuery,
  ): Promise<Result<GetOneServiceDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const service = await knex('services')
      .select('id', 'title', 'description', 'cost')
      .where('id', query.params.id)
      .first();

    if (!service) {
      return Result.fail(new NotFoundException('Услуга не найдена'));
    }

    return Result.ok(service);
  }
}
