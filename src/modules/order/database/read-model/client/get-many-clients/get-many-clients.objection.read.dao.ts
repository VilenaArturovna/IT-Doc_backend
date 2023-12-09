import { ExceptionBase } from '@libs/base-classes';
import { paginate } from '@libs/pagination';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetManyClientsQuery } from '@modules/order/queries';
import { Model } from 'objection';

import {
  GetManyClientsDaoModel,
  GetManyClientsReadDao,
} from './get-many-clients.read.dao';

export class GetManyClientsObjectionReadDao extends GetManyClientsReadDao {
  async query(
    query: GetManyClientsQuery,
  ): Promise<Result<GetManyClientsDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { type, beneficiary, page, order, search, sort, limit } =
      query.params;

    const qb = knex(Tables.CLIENTS)
      .select('id', 'name', 'phone', 'type', 'beneficiary')
      .groupBy('id');

    if (type) {
      qb.where('type', type);
    }

    if (beneficiary) {
      qb.where('beneficiary', beneficiary);
    }

    if (search) {
      qb.where((builder) =>
        builder
          .whereILike('name', `%${search}%`)
          .orWhereILike('fullName', `%${search}%`)
          .orWhereILike('directorName', `%${search}%`)
          .orWhereILike('INN', `%${search}%`),
      );
    }

    if (sort) {
      qb.orderBy(sort, order);
    } else {
      qb.orderBy('name');
    }

    return paginate({ page, limit, qb, isGrouped: true });
  }
}
