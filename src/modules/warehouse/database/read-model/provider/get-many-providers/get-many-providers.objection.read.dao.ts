import { ExceptionBase } from '@libs/base-classes';
import { paginate } from '@libs/pagination';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetManyProvidersQuery } from '@modules/warehouse/queries';
import { Model } from 'objection';

import {
  GetManyProvidersDaoModel,
  GetManyProvidersReadDao,
} from './get-many-providers.read.dao';

export class GetManyProvidersObjectionReadDao extends GetManyProvidersReadDao {
  async query(
    query: GetManyProvidersQuery,
  ): Promise<Result<GetManyProvidersDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { page, limit, search } = query.params;

    const qb = knex(Tables.PROVIDERS)
      .select('id', 'title', 'description')
      .orderBy('title')
      .groupBy(['id', 'title']);

    if (search) {
      qb.whereILike('title', `%${search}%`);
    }

    return paginate({ qb, page, limit, isGrouped: true });
  }
}
