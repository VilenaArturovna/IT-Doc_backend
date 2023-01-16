import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetManyServicesDaoModel,
  GetManyServicesReadDao,
} from './get-many-services.read.dao';
import { GetManyServicesQuery } from '@modules/warehouse/queries';
import { paginate } from '@libs/pagination';

export class GetManyServicesObjectionReadDao extends GetManyServicesReadDao {
  async query(
    query: GetManyServicesQuery,
  ): Promise<Result<GetManyServicesDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { page, limit, search } = query.params;

    const qb = knex('services')
      .select('id', 'title', 'description', 'cost')
      .orderBy('title')
      .groupBy(['id', 'title']);

    if (search) {
      qb.whereILike('title', `%${search}%`);
    }

    return paginate({ qb, page, limit, isGrouped: true });
  }
}
