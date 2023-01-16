import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetManyVendorsDaoModel,
  GetManyVendorsReadDao,
} from './get-many-vendors.read.dao';
import { GetManyVendorsQuery } from '@modules/warehouse/queries';
import { paginate } from '@libs/pagination';

export class GetManyVendorsObjectionReadDao extends GetManyVendorsReadDao {
  async query(
    query: GetManyVendorsQuery,
  ): Promise<Result<GetManyVendorsDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { page, limit, search } = query.params;

    const qb = knex('vendors')
      .select('id', 'title', 'description')
      .orderBy('title')
      .groupBy(['id', 'title']);

    if (search) {
      qb.whereILike('title', `%${search}%`);
    }

    return paginate({ qb, page, limit, isGrouped: true });
  }
}
