import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetManyWarehouseItemsDaoModel,
  GetManyWarehouseItemsReadDao,
} from './get-many-warehouse-items.read.dao';
import { GetManyWarehouseItemsQuery } from '@modules/warehouse/queries';
import { paginate } from '@libs/pagination';

export class GetManyWarehouseItemsObjectionReadDao extends GetManyWarehouseItemsReadDao {
  async query(
    query: GetManyWarehouseItemsQuery,
  ): Promise<Result<GetManyWarehouseItemsDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { limit, page, ...params } = query.params;

    const qb = knex('warehouse_items as wi')
      .select(
        'wi.*',
        knex.raw(`
        jsonb_build_object('id', v.id, 'name', v.name) as vendor,
        jsonb_build_object('id', p.id, 'name', p.name) as provider,
        jsonb_build_object('id', s.id, 'name', s.name) as service,
      `),
      )
      .innerJoin('vendors as v', 'v.id', 'wi.vendorId')
      .innerJoin('providers as p', 'p.id', 'wi.providerId')
      .innerJoin('services as s', 's.id', 'wi.serviceId');

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
