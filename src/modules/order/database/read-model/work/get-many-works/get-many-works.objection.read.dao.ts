import { ExceptionBase } from '@libs/base-classes';
import { paginate } from '@libs/pagination';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetManyWorksQuery } from '@modules/order/queries';
import { Model } from 'objection';

import {
  GetManyWorksDaoModel,
  GetManyWorksReadDao,
} from './get-many-works.read.dao';

export class GetManyWorksObjectionReadDao extends GetManyWorksReadDao {
  async query(
    query: GetManyWorksQuery,
  ): Promise<Result<GetManyWorksDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { limit, search, page } = query.params;

    const qb = knex(Tables.WORKS).select('*');

    if (search) {
      qb.whereILike('name', `%${search}%`);
    }

    return paginate({ qb, limit, page, isGrouped: false });
  }
}
