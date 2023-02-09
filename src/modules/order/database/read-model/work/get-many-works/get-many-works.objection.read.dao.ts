import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetManyWorksDaoModel,
  GetManyWorksReadDao,
} from './get-many-works.read.dao';
import { GetManyWorksQuery } from '@modules/order/queries';
import { paginate } from '@libs/pagination';

export class GetManyWorksObjectionReadDao extends GetManyWorksReadDao {
  async query(
    query: GetManyWorksQuery,
  ): Promise<Result<GetManyWorksDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { limit, search, page } = query.params;

    const qb = knex('works').select('*');

    if (search) {
      qb.whereILike('name', `%${search}%`);
    }

    return paginate({ qb, limit, page, isGrouped: false });
  }
}
