import { ExceptionBase } from '@libs/base-classes';
import { paginate } from '@libs/pagination';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetManyWarehouseItemsQuery } from '@modules/warehouse/queries';
import { Model } from 'objection';

import {
  GetManyWarehouseItemsDaoModel,
  GetManyWarehouseItemsReadDao,
} from './get-many-warehouse-items.read.dao';

export class GetManyWarehouseItemsObjectionReadDao extends GetManyWarehouseItemsReadDao {
  async query(
    query: GetManyWarehouseItemsQuery,
  ): Promise<Result<GetManyWarehouseItemsDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { limit, page, ...params } = query.params;

    const qb = knex(`${Tables.WAREHOUSE_ITEMS} as wi`)
      .select(
        'wi.*',
        knex.raw(`
        jsonb_build_object('id', v.id, 'title', v.title) as vendor,
        jsonb_build_object('id', p.id, 'title', p.title) as provider
      `),
      )
      .innerJoin(`${Tables.VENDORS} as v`, 'v.id', 'wi.vendorId')
      .innerJoin(`${Tables.PROVIDERS} as p`, 'p.id', 'wi.providerId');

    if (params.isArchived != undefined) {
      qb.where('isArchived', params.isArchived);
    }

    if (params.search) {
      qb.where((builder) => {
        const search = params.isExactMatch
          ? params.search
          : `%${params.search}%`;
        return builder
          .whereILike('partNumber', search)
          .orWhereILike('title', search)
          .orWhereILike('compatibleModels', search);
      });
    }

    return paginate({ qb, limit, page, isGrouped: false });
  }
}
